import requests
from bs4 import BeautifulSoup
import csv
import time
import pandas as pd

# 读取已保存的course信息（从CSV文件中加载已爬取的课程信息）
courses_df = pd.read_csv("courses_info.csv")

# 爬取Majors, Minors & Specialisations信息
def fetch_majors_minors_specialisations(course_url):
    # 为了防止请求过于频繁导致被服务器拒绝，添加1秒的延迟
    # time.sleep(1)
    # 请求course页面的Majors, Minors & Specialisations部分
    response = requests.get(course_url + "/majors-minors-specialisations")
    soup = BeautifulSoup(response.content, "html.parser")
    majors_info = {}

    # 查找Majors, Minors & Specialisations的相关信息
    majors_tag = soup.find("div", class_="course__body__inner layout-sidebar__main__inner box")

    # 提取代码的方法（用于从表格中提取名称，或者提取非表格的整个文本）
    def extract_majors(tag):
        if not tag:
            return "None"
        # 初始化文本部分
        text_content = tag.get_text(separator=" ", strip=True)
        # 查找是否有包含专业信息的表格
        tables = tag.find_all("table")
        all_majors = []

        # 处理每个表格
        for table in tables:
            # 如果存在表格，则只提取表格中的名称列
            majors = [row.find("td").text.strip() for row in table.find_all("tr") if row.find("td")]
            all_majors.extend(majors)
            # 将表格的内容替换为提取的名称
            text_content = text_content.replace(
                table.get_text(separator=" ", strip=True),
                f"|*{', '.join(majors)}*|"
            )

        return text_content

    # 提取专业、辅修和专业化的信息
    majors_info['majors'] = extract_majors(majors_tag) if majors_tag else "None"

    return majors_info

# 打开CSV文件以保存majors, minors & specialisations信息
with open("courses_majors_minors_specialisations.csv", mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    # 写入CSV文件的表头
    writer.writerow(["Course Code", "Majors, Minors & Specialisations"])

    # 遍历每一个course条目，从之前保存的courses_info.csv中读取
    for index, row in courses_df.iterrows():
        code = row["Course Code"]  # 获取课程代码
        course_url = row["Course Url"]  # 获取课程URL
        print(f"正在爬取 {code} 的majors, minors & specialisations信息...")
        # 爬取课程的majors, minors & specialisations信息
        majors_info = fetch_majors_minors_specialisations(course_url)

        # 将爬取的信息写入CSV文件
        writer.writerow([code, majors_info['majors']])

print("信息已成功爬取并保存到courses_majors_minors_specialisations.csv文件中！")
