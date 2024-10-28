import requests
from bs4 import BeautifulSoup
import csv

# Base URL of the subject search page
base_url = "https://handbook.unimelb.edu.au/search?types%5B%5D=subject&year=2024&level_type%5B%5D=all&campus_and_attendance_mode%5B%5D=all&org_unit%5B%5D=all&page={}&sort=_score%7Cdesc"

# Headers to mimic a browser visit
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
}


def scrape_subjects(page_number):
    # Send a GET request to the URL with the page number
    url = base_url.format(page_number)
    response = requests.get(url, headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extract different categories from the page
        data = []

        # Extract subject names and their URLs
        subjects = soup.find_all('li', class_='search-result-item')
        for subject in subjects:
            subject_name = subject.find('h3').get_text(strip=True)
            subject_code = subject.find('span', class_='search-result-item__code').get_text(strip=True)
            subject_type = subject.find('span', class_='search-result-item__flag').get_text(strip=True)
            subject_url = "https://handbook.unimelb.edu.au" + subject.find('a', class_='search-result-item__anchor')[
                'href']
            primary_info = subject.find('div', class_='search-result-item__meta-primary').get_text(strip=True)
            credits = subject.find('div', class_='search-result-item__meta-secondary').get_text(strip=True)

            # Append subject data to list
            data.append([subject_name, subject_code, subject_type, primary_info, credits, subject_url])

        return data
    else:
        print(f"Failed to retrieve data from the website. Status code: {response.status_code}")
        return []


# Function to scrape multiple pages and save data
def scrape_all_subjects():
    page_number = 1
    all_data = []

    while True:
        print(f"Scraping page {page_number}...")
        data = scrape_subjects(page_number)
        if not data:
            break
        all_data.extend(data)
        page_number += 1

    # Save the extracted data to a CSV file
    with open('unimelb_subjects.csv', 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['Subject Name', 'Subject Code', 'Subject Type', 'Primary Info', 'Credits', 'URL'])
        writer.writerows(all_data)

    print("Data has been successfully extracted and saved to 'unimelb_subjects.csv'")


# Start scraping
scrape_all_subjects()
