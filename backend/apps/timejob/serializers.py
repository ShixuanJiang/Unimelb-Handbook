from rest_framework import serializers
from apps.timejob import models


class JobControllerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.JobController
        fields = '__all__'
