from django.contrib import admin

# Register your models here.
from blog.models import Course, CoursePlan

admin.site.register(Course)

admin.site.register(CoursePlan)


