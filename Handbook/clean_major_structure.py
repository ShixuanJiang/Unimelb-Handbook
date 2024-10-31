import requests
from bs4 import BeautifulSoup
import csv
import time
import pandas as pd
import math

# 读取已保存的major信息（从CSV文件中加载已爬取的专业信息）
majors_df = pd.read_csv("major_urls.csv")

# 爬取Major Structure信息
def fetch_major_structure(major_url):
    # 请求major页面的Structure部分
    response = requests.get(major_url.replace('/print', '/course-structure'))
    soup = BeautifulSoup(response.content, "html.parser")
    major_structure_info = {}

    # 查找Structure的相关信息
    structure_tag = soup.find("div", class_="course__body__inner layout-sidebar__main__inner box")

    # 提取代码的方法（用于从表格中提取代码，或者提取非表格的整个文本）
    def extract_structure(tag):
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
            text_content = text_content.replace(table.get_text(separator=" ", strip=True), ", ".join(codes))

        # 截取到 "course__prev-next-buttons" 部分之前的内容
        end_tag = tag.find("div", class_="course__prev-next-buttons clearfix")
        if end_tag:
            text_content = text_content.split(end_tag.get_text(separator=" ", strip=True))[0]

        return text_content

    # 提取专业结构的信息
    major_structure_info['structure'] = extract_structure(structure_tag) if structure_tag else "None"

    return major_structure_info

# 打开CSV文件以保存major structure信息
with open("majors_structure.csv", mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    # 写入CSV文件的表头
    writer.writerow(["Course Code", "Major/Minor Name", "Structure"])

    # 遍历每一个major条目，从之前保存的major_urls.csv中读取
    for index, row in majors_df.iterrows():
        code = row["Course Code"]  # 获取课程代码
        major_name = row["Major/Minor Name"]  # 获取专业名称
        major_url = row["URL"]  # 获取专业URL

        print(f"正在爬取 {major_name} 的structure信息...")
        # 爬取专业的structure信息
        major_structure_info = fetch_major_structure(major_url)

        # 将爬取的信息写入CSV文件
        writer.writerow([code, major_name, major_structure_info['structure']])

print("信息已成功爬取并保存到majors_structure.csv文件中！")

# 测试爬取函数是否正确工作
# print(fetch_major_structure("https://handbook.unimelb.edu.au/2024/components/b-sci-major-17"))
