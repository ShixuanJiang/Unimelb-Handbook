from django.db import models
from django.utils import timezone


class BaseModel(models.Model):
    """          

    Args:
        models (_type_): _description_
    """
    created_at = models.DateTimeField(db_index=True, default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    is_delete = models.BooleanField(verbose_name="     ", default=False)

    class Meta:
        abstract = True
