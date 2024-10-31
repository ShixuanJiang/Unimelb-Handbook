import requests
from bs4 import BeautifulSoup
import csv
import time
import pandas as pd

# 读取已保存的course信息（从CSV文件中加载已爬取的课程信息）
courses_df = pd.read_csv("courses_info.csv")

# 爬取Majors, Minors & Specialisations信息
def fetch_majors_minors_specialisations(course_url):

    # 请求course页面的Majors, Minors & Specialisations部分
    response = requests.get(course_url + "/majors-minors-specialisations")
    soup = BeautifulSoup(response.content, "html.parser")
    majors_info = []

    # 查找Majors, Minors & Specialisations的相关信息
    majors_tag = soup.find("div", class_="course__body__inner layout-sidebar__main__inner box")

    if majors_tag:
        # 查找包含专业信息的表格
        tables = majors_tag.find_all("table")

        # 处理每个表格
        for table in tables:
            # 提取表格中的名称列和URL
            for row in table.find_all("tr"):
                name_tag = row.find("td")
                if name_tag:
                    name = name_tag.text.strip()
                    link = name_tag.find("a")["href"] if name_tag.find("a") else ""
                    major_with_url = (name, f"{course_url.split('/2024')[0]}{link}") if link else (name, "None")
                    majors_info.append(major_with_url)

    return majors_info

# 打开CSV文件以保存majors, minors & specialisations信息
with open("major_urls.csv", mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    # 写入CSV文件的表头
    writer.writerow(["Course Code", "Major/Minor Name", "URL"])

    # 遍历每一个course条目，从之前保存的courses_info.csv中读取
    for index, row in courses_df.iterrows():
        code = row["Course Code"]  # 获取课程代码
        course_url = row["Course Url"]  # 获取课程URL
        print(f"正在爬取 {code} 的majors, minors & specialisations信息...")
        # 爬取课程的majors, minors & specialisations信息
        majors_info = fetch_majors_minors_specialisations(course_url)

        # 将爬取的信息写入CSV文件
        for major in majors_info:
            writer.writerow([code, major[0], major[1]])

print("信息已成功爬取并保存到major_urls.csv文件中！")

# print(fetch_majors_minors_specialisations("https://handbook.unimelb.edu.au/2024/courses/b-sci"))