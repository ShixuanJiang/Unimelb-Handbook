import requests
from bs4 import BeautifulSoup
import csv
import time
import pandas as pd

# 读取已保存的subject信息
df = pd.read_csv("subjects_info.csv")

# 爬取Eligibility and Requirements信息
def fetch_eligibility_requirements(subject_url):
    #time.sleep(1)  # 添加延迟以防止请求过快被服务器拒绝
    response = requests.get(subject_url + "/eligibility-and-requirements")
    soup = BeautifulSoup(response.content, "html.parser")
    eligibility_info = {}

    # 查找Prerequisites, Corequisites, Non-allowed subjects
    prereq_tag = soup.find("div", id="prerequisites")
    coreq_tag = soup.find("h3", string="Corequisites")
    non_allowed_tag = soup.find("h3", string="Non-allowed subjects")
    inherent_req_tag = soup.find("h3", string="Inherent requirements (core participation requirements)")

    # 提取代码的方法（用于从表格中提取代码，或者提取非表格的整个文本）
    def extract_codes(tag):
        if not tag:
            return "None"
        # 初始化文本部分
        text_content = tag.get_text(separator="|", strip=True)
        # 查找是否有包含课程信息的表格
        tables = tag.find_all("table", class_="zebra course_structure")
        all_codes = []

        # 处理每个表格
        for table in tables:
            # 如果存在表格，则只提取表格中的课程代码（Code列）
            codes = [row.find("td").text.strip() for row in table.find_all("tr") if row.find("td")]
            all_codes.extend(codes)
            # 将表格的内容替换为提取的代码
            text_content = text_content.replace(table.get_text(separator="|", strip=True), ", ".join(codes))

        return text_content


    eligibility_info['prerequisites'] = extract_codes(prereq_tag)
    # 提取核心要求（Corequisites），将 <h3>Non-allowed subjects</h3> 之前的内容都提取出来
    if coreq_tag:
        coreq_content = []
        current_tag = coreq_tag.find_next_sibling()
        while current_tag and current_tag.name != "h3" and "Non-allowed subjects" not in current_tag.text:
            coreq_content.append(current_tag)
            current_tag = current_tag.find_next_sibling()
        eligibility_info['corequisites'] = extract_codes(
            BeautifulSoup("".join(str(tag) for tag in coreq_content), "html.parser")) if coreq_content else "None"
    else:
        eligibility_info['corequisites'] = "None"
    # 提取不允许的学科（Non-allowed subjects），将 <h3>Inherent requirements (core participation requirements)</h3> 之前的内容都提取出来
    if non_allowed_tag:
        non_allowed_content = []
        current_tag = non_allowed_tag.find_next_sibling()
        while current_tag and current_tag.name != "h3" and "Inherent requirements (core participation requirements)" not in current_tag.text:
            non_allowed_content.append(current_tag)
            current_tag = current_tag.find_next_sibling()
        eligibility_info['non_allowed_subjects'] = extract_codes(
            BeautifulSoup("".join(str(tag) for tag in non_allowed_content),
                          "html.parser")) if non_allowed_content else "None"
    else:
        eligibility_info['non_allowed_subjects'] = "None"
    return eligibility_info

# 打开CSV文件保存eligibility requirements信息
with open("1subjects_eligibility.csv", mode="w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["Subject Code", "Prerequisites", "Corequisites", "Non-allowed Subjects"])

    # 遍历每一个subject条目
    for index, row in df.iterrows():
        code = row["Subject Code"]
        subject_url = row["URL"]
        print(f"正在爬取 {code} 的eligibility requirements...")
        eligibility_info = fetch_eligibility_requirements(subject_url)

        # 写入CSV
        writer.writerow([code, eligibility_info['prerequisites'], eligibility_info['corequisites'], eligibility_info['non_allowed_subjects']])

print("信息已成功爬取并保存到subjects_eligibility.csv文件中！")

# print(fetch_eligibility_requirements("https://handbook.unimelb.edu.au/2024/subjects/comp30019"))
