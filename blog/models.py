from django.db import models
from django.core.validators import RegexValidator

# Create your models here.

class Course(models.Model):
      course_id = models.AutoField(primary_key=True)
    # 课程名称
    title = models.CharField(max_length=255)
    # 课程代码
    code = models.CharField(
        max_length=10,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^[A-Z]{4}\d{5}$',
                message='课程代码必须是4个大写字母加上5位数字，如COMP20006'
            )
        ]
    )
    #primary info
    info = models.CharField(max_length=255)
    # 学分
    credits = models.PositiveIntegerField()
    #url
    url = models.TextField()

    def level(self):
        numeric_part = self.code[4:]
        return int(numeric_part[0])

class CoursePlan(models.Model):
    student_id = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    course = models.ManyToManyField(Course)
    semester = models.CharField(max_length=50)