from utils.rest_framework_util.viewset import CommonViewSet
from apps.timejob import serializers
from apps.timejob import models


class JobControllerViewSet(CommonViewSet):
    serializer_class = serializers.JobControllerSerializer
    queryset = models.JobController.objects.all()
