from django.db import models
from django.utils import timezone


class BaseModel(models.Model):
    """ 可继承的基础模型类

    Args:
        models (_type_): _description_
    """
    created_at = models.DateTimeField(db_index=True, default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_delete = models.BooleanField(verbose_name="是否软删除", default=False)

    class Meta:
        abstract = True
