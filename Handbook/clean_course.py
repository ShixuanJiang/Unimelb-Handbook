import requests
from bs4 import BeautifulSoup
import csv
import time
import pandas as pd

# 读取已保存的course信息（从CSV文件中加载已爬取的课程信息）
courses_df = pd.read_csv("courses_info.csv")

# 爬取Course Structure信息
def fetch_course_structure(course_url):
    # 为了防止请求过于频繁导致被服务器拒绝，添加1秒的延迟
    # time.sleep(1)
    # 请求course页面的Course Structure部分
    response = requests.get(course_url + "/course-structure")
    soup = BeautifulSoup(response.content, "html.parser")
    course_structure_info = {}

    # 查找Course structure的相关信息
    course_structure_tag = soup.find("div", class_="mobile-wrap sidebar-tabs__panel box")

    # 提取代码的方法（用于从表格中提取代码，或者提取非表格的整个文本）
    def extract_codes(tag):
        if not tag:
            return "None"
        # 初始化文本部分
        text_content = tag.get_text(separator=" ", strip=True)
        # 查找是否有包含课程信息的表格
        tables = tag.find_all("table")
        all_codes = []

        # 处理每个表格
        for table in tables:
            # 如果存在表格，则只提取表格中的课程代码（Code列）
            codes = [row.find("td").text.strip() for row in table.find_all("tr") if row.find("td")]
            all_codes.extend(codes)
            # 将表格的内容替换为提取的代码
            text_content = text_content.replace(
                table.get_text(separator=" ", strip=True),
                f"|*{', '.join(codes)}*|"
            )

        return text_content

    # 提取课程结构
    course_structure_info['course_structure'] = extract_codes(course_structure_tag) if course_structure_tag else "None"

    return course_structure_info

# 打开CSV文件以保存course structure信息
with open("courses_structure.csv", mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    # 写入CSV文件的表头
    writer.writerow(["Course Code", "Course Structure"])

    # 遍历每一个course条目，从之前保存的courses_info.csv中读取
    for index, row in courses_df.iterrows():
        code = row["Course Code"]  # 获取课程代码
        course_url = row["Course Url"]  # 获取课程URL
        print(f"正在爬取 {code} 的course structure...")
        # 爬取课程的course structure信息
        course_structure_info = fetch_course_structure(course_url)

        # 将爬取的信息写入CSV文件
        writer.writerow([code, course_structure_info['course_structure']])

print("信息已成功爬取并保存到courses_structure.csv文件中！")

# print(fetch_course_structure("https://handbook.unimelb.edu.au/2024/courses/mc-scimat"))
