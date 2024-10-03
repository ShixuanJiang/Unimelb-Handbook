#       
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJob

# Utils
from utils.settings.log_config import logger

__all__ = {
    "SchedulerManager",
    'test_job_func',
    'test_work_func'
}


def test_job_func(text):
    logger.info(f"[TEST]test_job:{text}")


def test_work_func():
    logger.info("[TEST]test_work")


class SchedulerManager(object):
    """       
    """

    def __init__(self, scheduler_name: str = "default") -> None:
        self.scheduler = BackgroundScheduler()  
        self.scheduler.add_jobstore(DjangoJobStore(), scheduler_name)

    def get_scheduler_object(self):
        return self.scheduler

    def start(self):
        self.scheduler.start()

    def add_job_by_date(self, job, args: list = None, run_date: str = None, job_name: str = "default"):
        if run_date is None:
            run_date = datetime.now()
        if args is None:
            current_job = self.scheduler.add_job(
                job, "date", run_date=run_date, replace_existing=True, name=job_name)
            return current_job.id
        else:
            current_job = self.scheduler.add_job(
                job, "date", run_date=run_date, args=args, replace_existing=True, name=job_name)
            return current_job.id

    def add_job_by_interval(self, job, args: list = None, seconds: int = 1, job_name: str = "default"):
        """
        Args:
            job_name:
            job:
            args:
            seconds:
        Returns:
        """
        if args is None:
            current_job = self.scheduler.add_job(
                job, "interval", seconds=seconds, replace_existing=True)
            return current_job.id
        else:
            current_job = self.scheduler.add_job(
                job, "interval", seconds=seconds, args=args, replace_existing=True)
            return current_job.id


if __name__ == "__main__":
    scheduler_tool = SchedulerManager()
    scheduler_tool.add_job_by_interval(test_job_func, ["testttt"], 20)
    scheduler_tool.start()