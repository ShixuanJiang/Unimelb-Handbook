import datetime
from apps.timejob.models import JobController
from django_apscheduler.jobstores import DjangoJobStore
from utils.scheduled_task.timedo import SchedulerManager, test_job_func, test_work_func
from django_apscheduler.models import DjangoJob

__all__ = {
    'do_work'
}


def do_work(work_name: str, is_start: bool = True, created: bool = True):
    if created and not is_start:
        return
    if JobController.objects.filter(work_name=work_name).exists():
        job_id = JobController.objects.filter(work_name=work_name)[0].job_id
        if not is_start:
            DjangoJob.objects.filter(id=job_id).delete()
            JobController.objects.filter(job_id=job_id).delete()
        else:
            is_exists = DjangoJob.objects.filter(id=job_id).exists()
            if not is_exists:
                if work_name == "test_work":
                    scheduler_tool = SchedulerManager()
                    job_id = scheduler_tool.add_job_by_interval(test_work_func, None, 10)
                    scheduler_tool.start()
                    JobController.objects.filter(work_name=work_name).update(job_id=job_id)  #   Job_id
                elif work_name == "test_job":
                    scheduler_tool = SchedulerManager()
                    job_id = scheduler_tool.add_job_by_interval(test_job_func, ['ok find'], 5)
                    scheduler_tool.start()
                    JobController.objects.filter(work_name=work_name).update(job_id=job_id)  #   Job
            else:
                job_store = DjangoJobStore()
                django_job = job_store.lookup_job(job_id)
                if django_job is not None:
                    work = SchedulerManager()
                    django_job.next_run_time = datetime.datetime.now(
                        work.get_scheduler_object().timezone)
                    work.get_scheduler_object()._real_add_job(django_job, "default", True)
                    work.start()
                else:
                    print("is None")


def delete_work(job_id: str):
    DjangoJob.objects.filter(id=job_id).delete()
