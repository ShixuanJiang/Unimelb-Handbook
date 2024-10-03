from django.db import models


class JobController(models.Model):
    work_name = models.CharField(verbose_name='work name', default='default', max_length=255, unique=True)  
    job_id = models.CharField(verbose_name='job_id', default='None', max_length=255, editable=False)
    is_start = models.BooleanField(default=False, verbose_name='is begin work')

    class Meta:
        verbose_name = 'JobController'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.work_name
