from utils.rest_framework_util.viewset import CommonViewSet
from apps.goods import serializers
from apps.goods import models


class BachorInfoViewSet(CommonViewSet):
    serializer_class = serializers.BachorInfoSerializer
    queryset = models.BachorInfo.objects.order_by('info_type').all()


class SubjectInfoViewSet(CommonViewSet):
    serializer_class = serializers.SubjectInfoSerializer
    queryset = models.SubjectInfo.objects.all()
    search_fields = ['subject_name','code','primary_info','credit_points','subject_url']

class TemplateRecordViewSet(CommonViewSet):
    serializer_class = serializers.TemplateRecordSerializer
    queryset = models.TemplateRecord.objects.all()
    search_fields = ['name','id']

