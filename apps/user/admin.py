from apps.user import models

from utils.rest_framework_util.admin import CommonAdmin

# Register your models here.

CommonAdmin(models.User)
CommonAdmin(models.UserLoggerInfo)
CommonAdmin(models.ServerData)
CommonAdmin(models.RouterMeta)
CommonAdmin(models.MenuInfo)
CommonAdmin(models.ChildMenuInfo)
