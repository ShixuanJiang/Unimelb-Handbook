from blog.models import Course
import csv

def import_courses_from_csv():
    with open('data/subjects_info.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # 使用 get_or_create 避免重复插入
            course, created = Course.objects.get_or_create(
                code=row['Subject Code'],  # 依据课程代码查找
                defaults={
                    'title': row['Subject Name'],
                    'info': row['Primary Info'],
                    'credits': int(row['Credit Points']),
                    'url': row['Subject Url']
                }
            )
            # 如果记录已存在，你也可以选择更新它
            if not created:
                course.title = row['Subject Name']
                course.info = row['Primary Info']
                course.credits = int(row['Credit Points'])
                course.url = row['Subject Url']
                course.save()

import_courses_from_csv()
