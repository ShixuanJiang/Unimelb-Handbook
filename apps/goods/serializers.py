from rest_framework import serializers
from apps.goods import models


class SubjectInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SubjectInfo
        fields = '__all__'


class BachorInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BachorInfo
        fields = '__all__'