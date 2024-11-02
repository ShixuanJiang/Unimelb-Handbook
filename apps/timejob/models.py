from django.db import models


class JobController(models.Model):
    work_name = models.CharField(verbose_name='工作名称', default='default', max_length=255, unique=True)  # 作为区分
    job_id = models.CharField(verbose_name='job_id', default='None', max_length=255, editable=False)
    is_start = models.BooleanField(default=False, verbose_name='是否开始工作')

    class Meta:
        verbose_name = 'Job控制器'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.work_name
