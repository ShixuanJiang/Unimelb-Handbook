from utils.requests_util import CommonRequest
from utils.rest_framework_util.admin import CommonAdmin
from apps.goods import models

CommonAdmin(models.BachorInfo)
CommonAdmin(models.SubjectInfo)
CommonAdmin(models.TemplateRecord)

