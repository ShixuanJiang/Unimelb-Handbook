import requests
from bs4 import BeautifulSoup
import csv
import time

# 基础URL
base_url = "https://handbook.unimelb.edu.au"
initial_url = f"{base_url}/search?types%5B%5D=subject&year=2024&level_type%5B%5D=all&campus_and_attendance_mode%5B%5D=all&org_unit%5B%5D=all&page=1&sort=_score%7Cdesc"

# 函数用于获取所有页面的URL
def get_all_pages(base_url, initial_url):
    pages = [initial_url]
    try:
        response = requests.get(initial_url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching the URL: {e}")
        exit()

    soup = BeautifulSoup(response.content, "html.parser")
    pagination = soup.find("nav", class_="pagination")
    if pagination:
        last_page_link = pagination.find("span", class_="last").find("a")
        if last_page_link:
            last_page_url = last_page_link.get("href")
            last_page_number = int(last_page_url.split("page=")[1].split("&")[0])
            for i in range(2, last_page_number + 1):
                pages.append(f"{base_url}/search?page={i}&types%5B%5D=subject&year=2024")
    return pages

# 获取所有页面的URL
all_pages = get_all_pages(base_url, initial_url)

# 打开CSV文件进行保存
try:
    with open("subjects_info.csv", mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["Subject Name", "Subject Code", "URL", "Level", "Credit Points", "Offering Info"])

        # 遍历所有页面并爬取数据
        for page_number, page_url in enumerate(all_pages, start=1):
            print(f"正在爬取第 {page_number} 页: {page_url}")
            try:
                response = requests.get(page_url)
                response.raise_for_status()
            except requests.exceptions.RequestException as e:
                print(f"Error fetching the URL: {e}")
                continue

            soup = BeautifulSoup(response.content, "html.parser")
            subjects = soup.find_all("li", class_="search-result-item")

            # 检查页面结构是否符合预期
            if not subjects:
                print(f"Warning: No subjects found on page {page_url}. The page structure may have changed.")
                continue

            # 遍历每一个subject条目
            for subject in subjects:
                name_tag = subject.find("h3")
                code_tag = subject.find("span", class_="search-result-item__code")
                url_tag = subject.find("a", class_="search-result-item__anchor")
                meta_secondary_tag = subject.find("div", class_="search-result-item__meta-secondary")
                meta_primary_tag = subject.find("div", class_="search-result-item__meta-primary")

                if name_tag and code_tag and url_tag and meta_secondary_tag:
                    name = name_tag.text.strip()
                    code = code_tag.text.strip()
                    subject_url = base_url + url_tag.get("href").strip()
                    level_and_credit = meta_secondary_tag.text.strip()
                    offering_info = meta_primary_tag.text.strip() if meta_primary_tag else "Not Available"

                    # 分析 level_and_credit 字符串以提取level和credit points
                    level, credit_points = "", ""
                    if "," in level_and_credit:
                        parts = level_and_credit.split(",")
                        level = parts[0].strip()
                        credit_points = parts[1].strip()

                    # 写入CSV
                    writer.writerow([name, code, subject_url, level, credit_points, offering_info])

            time.sleep(1)  # 避免请求过于频繁
except IOError as e:
    print(f"Error writing to subjects_info.csv: {e}")
    exit()

print("信息已成功爬取并保存到subjects_info.csv文件中！")

# 打开CSV文件并读取每个学科的URL
try:
    with open("subjects_info.csv", mode="r", encoding="utf-8") as file:
        reader = csv.reader(file)
        next(reader)  # 跳过标题行

        # 打开另一个CSV文件保存先决条件信息
        try:
            with open("subjects_prerequisites.csv", mode="w", newline="", encoding="utf-8") as prereq_file:
                prereq_writer = csv.writer(prereq_file)
                prereq_writer.writerow(["Subject Code", "Prerequisites"])

                # 遍历每个学科的URL并爬取先决条件信息
                for row in reader:
                    subject_code = row[1]
                    eligibility_url = row[2] + "/eligibility-and-requirements"

                    # 发送请求并获取页面内容
                    try:
                        response = requests.get(eligibility_url)
                        response.raise_for_status()
                    except requests.exceptions.RequestException as e:
                        print(f"Error fetching the URL: {e}")
                        continue

                    time.sleep(1)  # 避免请求过于频繁
                    eligibility_soup = BeautifulSoup(response.content, "html.parser")
                    prerequisites_div = eligibility_soup.find("div", id="prerequisites")

                    if prerequisites_div:
                        prerequisites_text = prerequisites_div.get_text(separator=" ", strip=True)
                    else:
                        prerequisites_text = "None"

                    # 写入先决条件信息到CSV文件
                    prereq_writer.writerow([subject_code, prerequisites_text])
        except IOError as e:
            print(f"Error writing to subjects_prerequisites.csv: {e}")
            exit()
except IOError as e:
    print(f"Error reading subjects_info.csv: {e}")
    exit()

print("先决条件信息已成功爬取并保存到subjects_prerequisites.csv文件中！")
