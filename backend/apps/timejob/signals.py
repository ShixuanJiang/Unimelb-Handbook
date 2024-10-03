from django.db.models import signals
from apps.timejob import models
from apps.timejob.util.work import do_work, delete_work


def create_job(sender, instance, created, **kwargs):
    do_work(instance.work_name, instance.is_start, created)


def delete_job(sender, instance: models.JobController, **kwargs):
    job_id = instance.job_id
    if job_id is not None:
        delete_work(job_id)


signals.post_save.connect(create_job, sender=models.JobController)
signals.pre_delete.connect(delete_job, sender=models.JobController)
