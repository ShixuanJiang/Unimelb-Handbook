import requests
from bs4 import BeautifulSoup
import csv
import time

# 目标URL
base_url = "https://handbook.unimelb.edu.au"

# 读取subjects_info.csv并爬取Eligibility and Requirements信息
def fetch_eligibility_requirements(subject_url):
    time.sleep(1)  # 添加延迟以防止请求过快被服务器拒绝
    response = requests.get(subject_url + "/eligibility-and-requirements")
    soup = BeautifulSoup(response.content, "html.parser")
    eligibility_info = {}

    # 查找Prerequisites, Corequisites, Non-allowed subjects
    prereq_tag = soup.find("div", id="prerequisites")
    coreq_tag = soup.find("h3", string="Corequisites")
    non_allowed_tag = soup.find("h3", string="Non-allowed subjects")

    eligibility_info['prerequisites'] = prereq_tag.get_text(separator=" ", strip=True) if prereq_tag else "None"
    eligibility_info['corequisites'] = coreq_tag.find_next_sibling("p").get_text(strip=True) if coreq_tag else "None"
    eligibility_info['non_allowed_subjects'] = non_allowed_tag.find_next_sibling("p").get_text(strip=True) if non_allowed_tag else "None"

    return eligibility_info

# 打开CSV文件保存eligibility requirements信息
with open("subjects_info.csv", mode="r", newline="", encoding="utf-8") as infile, open("subjects_eligibility.csv", mode="w", newline="", encoding="utf-8") as outfile:
    reader = csv.reader(infile)
    writer = csv.writer(outfile)
    next(reader)  # 跳过表头
    writer.writerow(["Subject Code", "Prerequisites", "Corequisites", "Non-allowed Subjects"])

    for row in reader:
        code = row[1]
        subject_url = row[2]
        print(f"正在爬取 {code} 的eligibility requirements...")
        eligibility_info = fetch_eligibility_requirements(subject_url)

        # 写入CSV
        writer.writerow([code, eligibility_info['prerequisites'], eligibility_info['corequisites'], eligibility_info['non_allowed_subjects']])

print("信息已成功爬取并保存到subjects_eligibility.csv文件中！")
