# Create your models here.
from django.db import models


class BachorInfo(models.Model):
    info_type = models.IntegerField(default=0,verbose_name='类型')
    name = models.TextField(verbose_name='内容',default='')

    class Meta:
        verbose_name = '信息表'
        verbose_name_plural = verbose_name

class SubjectInfo(models.Model):
    subject_name = models.CharField(verbose_name='科目',default='',max_length=100)
    code = models.CharField(verbose_name='科目代码',default='',max_length=10)
    primary_info = models.CharField(verbose_name='primary info',default='',max_length=100)
    credit_points = models.IntegerField(verbose_name='credit points',default=0)
    subject_url = models.CharField(verbose_name='subject url',default='',max_length=100)

    class Meta:
        verbose_name = 'info'
        verbose_name_plural = verbose_name
