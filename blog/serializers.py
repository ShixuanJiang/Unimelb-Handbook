from rest_framework import serializers
from .models import Course  # 在序列化器中导入模型

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['course_id', 'title', 'code', 'info', 'credits', 'url']
