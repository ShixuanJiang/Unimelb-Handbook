# Create your models here.
from django.db import models


class BachorInfo(models.Model):
    info_type = models.IntegerField(default=0,verbose_name='Type')
    name = models.TextField(verbose_name='Content',default='')

    class Meta:
        verbose_name = 'BachorInfo'
        verbose_name_plural = verbose_name

class SubjectInfo(models.Model):
    subject_name = models.CharField(verbose_name='Subject',default='',max_length=100)
    code = models.CharField(verbose_name='Subject Code',default='',max_length=10)
    primary_info = models.CharField(verbose_name='primary info',default='',max_length=100)
    credit_points = models.IntegerField(verbose_name='credit points',default=0)
    subject_url = models.CharField(verbose_name='subject url',default='',max_length=100)

    class Meta:
        verbose_name = 'SubjectInfo'
        verbose_name_plural = verbose_name

class TemplateRecord(models.Model):
    name = models.CharField(verbose_name='name',default='',max_length=100)
    subject_name =  models.CharField(verbose_name='Subject',default='',max_length=100)
    content = models.CharField(verbose_name='SubjectContent',default='',max_length=250)
    is_checked = models.BooleanField(verbose_name='isCheck',default=False)
    semester = models.CharField(verbose_name='semester',default='',max_length=250)

    class Meta:
        verbose_name = 'Template'
        verbose_name_plural = verbose_name