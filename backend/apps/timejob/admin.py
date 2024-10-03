# Register your models here.
from utils.rest_framework_util.admin import CommonAdmin
from apps.timejob import models

CommonAdmin(models.JobController)
