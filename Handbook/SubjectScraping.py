import requests
from bs4 import BeautifulSoup
import re
import csv


def extract_subject_info(subject):
    subject_name = subject.find('h3').text.strip()
    subject_code = subject.find('span', class_='search-result-item__code').text.strip()

    meta_primary = subject.find('div', class_='search-result-item__meta-primary')
    primary_info = meta_primary.find('p').text.strip() if meta_primary else "Not available"

    meta_secondary = subject.find('div', class_='search-result-item__meta-secondary')
    if meta_secondary and meta_secondary.find('p'):
        credit_points_text = meta_secondary.find('p').text.strip()
        match = re.search(r'\d+', credit_points_text)
        credit_points = match.group() if match else "0"
    else:
        credit_points = "0"

    return {
        "Subject Name": subject_name,
        "Subject Code": subject_code,
        "Primary Info": primary_info,
        "Credit Points": credit_points
    }


def fetch_subjects_from_page(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0"
    }

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        subjects = soup.find_all('li', class_='search-result-item')
        return [extract_subject_info(subject) for subject in subjects]
    else:
        print(f"无法获取页面内容。状态码: {response.status_code}")
        return []


def find_next_page_url(soup):
    next_page = soup.find('a', string='Next ›')
    if not next_page:
        next_page = soup.find('a', string='Last ››')
    if next_page:
        return next_page['href']
    return None


def save_to_csv(data, filename):
    keys = data[0].keys() if data else []
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=keys)
        writer.writeheader()
        for row in data:
            writer.writerow(row)


def main():
    base_url = 'https://handbook.unimelb.edu.au/search?types%5B%5D=subject'
    current_page_url = base_url
    all_subjects = []

    while current_page_url:
        print(f"处理页面: {current_page_url}")
        subjects = fetch_subjects_from_page(current_page_url)
        all_subjects.extend(subjects)

        # 请求当前页面的HTML以查找下一页链接
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0"
        }

        response = requests.get(current_page_url, headers=headers)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            next_page_url = find_next_page_url(soup)
            if next_page_url:
                current_page_url = f"https://handbook.unimelb.edu.au{next_page_url}"
            else:
                print("没有找到下一页，爬取结束。")
                current_page_url = None
        else:
            print(f"无法获取页面内容。状态码: {response.status_code}")
            break

    # 保存所有科目信息到CSV文件
    save_to_csv(all_subjects, 'subjects_info.csv')


if __name__ == "__main__":
    main()
