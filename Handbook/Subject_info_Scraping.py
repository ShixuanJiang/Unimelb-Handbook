import requests
from bs4 import BeautifulSoup
import pandas as pd


def extract_eligibility_and_requirements(url):
    # 设置请求头信息，模拟浏览器访问
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0"
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        # 查找所有 Eligibility and Requirements 区域内的标题标签（<h3>）
        eligibility_section = soup.find('div', id='prerequisites').find_parent()

        # 用于保存所有标题及其对应内容的字典
        data = {}

        # 遍历所有 <h3> 标签，提取其后面的内容
        for header in eligibility_section.find_all('h3'):
            title = header.get_text(strip=True)

            # 提取标题后面的内容
            content = get_content_after_header(header)

            # 将标题和内容保存到字典中
            data[title] = content

        # 使用 Pandas 将数据转换为表格格式
        df = pd.DataFrame(list(data.items()), columns=['Requirement Type', 'Details'])
        return df
    else:
        print(f"无法获取页面内容。状态码: {response.status_code}")
        return None


def get_content_after_header(header):
    """
    提取标题后面的所有内容，包括表格、段落、列表等，并将它们格式化为字符串
    """
    content = []
    current_element = header.find_next_sibling()  # 获取紧跟在标题后面的第一个兄弟节点

    while current_element and current_element.name not in ['h3']:
        if current_element.name == 'p':
            # 提取段落内容
            content.append(current_element.get_text(" ", strip=True))
        elif current_element.name == 'table':
            # 解析表格内容，但不提取表头
            table_content = parse_table(current_element)
            if table_content:
                content.append(table_content)
        elif current_element.name == 'a':
            # 提取超链接文本
            content.append(current_element.get_text(strip=True))
        elif current_element.name == 'ul':
            # 提取列表内容
            content.append(parse_list(current_element))
        current_element = current_element.find_next_sibling()

    # 合并所有内容为字符串并返回
    return "\n".join(content)


def parse_table(table):
    """
    解析表格内容并提取课程代码及名称，不包含表头
    """
    subjects = []
    rows = table.find_all('tr')

    for row in rows:
        columns = row.find_all('td')
        if columns:
            subject_code = columns[0].text.strip()
            subject_name = columns[1].text.strip()
            subjects.append(f"{subject_code} - {subject_name}")
    return ", ".join(subjects)


def parse_list(ul_element):
    """
    解析 <ul> 列表内容
    """
    items = [li.get_text(strip=True) for li in ul_element.find_all('li')]
    return "; ".join(items)


# 示例 URL（使用你提供的 HTML 结构对应的 URL）
subject_url = 'https://handbook.unimelb.edu.au/2024/subjects/comp30019/eligibility-and-requirements'

# 提取 Eligibility and Requirements 信息，并输出为表格格式
df = extract_eligibility_and_requirements(subject_url)

# 保存 DataFrame 到 CSV 文件中
if df is not None:
    df.to_csv("eligibility_and_requirements.csv", index=False, encoding='utf-8')
    print("数据已保存到 eligibility_and_requirements.csv 文件中。")



