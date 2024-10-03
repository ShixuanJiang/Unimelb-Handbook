from django.db import models
from django.contrib.auth.models import AbstractUser


__all__ = {
    "User",
    "UserLoggerInfo",
    "ServerData",
    "RouterMeta"
}


class User(AbstractUser):
    phone = models.CharField(max_length=11, blank=True, help_text="Phone",
                             default="13824464121", verbose_name="Phone", auto_created=True)
    is_delete = models.BooleanField(verbose_name="delte", default=False)

    # acro admin
    name = models.CharField(verbose_name='Name', default='Demo', null=True, blank=True, max_length=255)
    job = models.CharField(verbose_name='work', default='SoftJob', null=True, blank=True, max_length=255)
    jobName = models.CharField(verbose_name='workname', default='SoftWare', null=True, blank=True, max_length=255)
    organizationName = models.TextField(verbose_name='organization', null=True, default='Front', blank=True)
    locationName = models.TextField(verbose_name='PositionName', null=True, default='ShangHai', blank=True)
    avatar = models.URLField(verbose_name='Avatar',
                             default='https://ytouch-1258011219.cos.ap-nanjing.myqcloud.com/ww.jpg',
                             null=True, blank=True)
    organization = models.TextField(verbose_name='Comm', null=True, default='Front', blank=True)
    location = models.TextField(verbose_name='Position', null=True, default='ShangHai', blank=True)
    introduction = models.TextField(verbose_name='Introduce', null=True, default='Do Artist', blank=True)
    personalWebsite = models.URLField(verbose_name='Personal Website', default='https://github.com/huifeng-kooboo', null=True,
                                      blank=True)
    registrationDate = models.DateTimeField(verbose_name='RegisterDate', auto_created=True, auto_now=True)
    accountId = models.CharField(verbose_name='AccountId', default='13824464121', null=True, blank=True, max_length=255)
    certification = models.IntegerField(verbose_name='Authenticated', default=1)
    ROLE_TYPE = (
        ('admin', 'Manage'),
        ('user', 'CommonUser')
    )
    role = models.CharField(verbose_name='Character', choices=ROLE_TYPE, default='admin', null=True, blank=True,
                            max_length=255)

    class Meta:
        verbose_name = "User"
        verbose_name_plural = verbose_name

    def __str__(self):
        return f"{self.username}_{self.phone}"


class UserLoggerInfo(models.Model):
    user = models.ForeignKey(
        to=User, on_delete=models.CASCADE, verbose_name='Role')

    logger_info = models.TextField(null=True, blank=True, help_text="ContentLogger",
                                   verbose_name="LogContent")

    create_time = models.DateTimeField(verbose_name='CreateTime', auto_now_add=True)
    update_time = models.DateTimeField(verbose_name='UpdateTime', auto_now=True)

    class Meta:
        verbose_name = 'Log'
        verbose_name_plural = verbose_name


class RouterMeta(models.Model):
    roles = models.CharField(verbose_name='asadfs', max_length=255, null=True, blank=True)
    requiresAuth = models.BooleanField(verbose_name='asfas', default=False)
    icon = models.CharField(verbose_name='icon', null=True, blank=True, max_length=255)
    locale = models.CharField(verbose_name='locale', default='', null=True, blank=True, max_length=255)
    hideInMenu = models.BooleanField(verbose_name='assaf', null=True, blank=True)
    hideChildrenInMenu = models.BooleanField(verbose_name='asfsaasf', null=True, blank=True)
    activeMenu = models.CharField(verbose_name='djaijds', max_length=255, null=True, blank=True)
    order = models.IntegerField(verbose_name='sdajjds', null=True, blank=True)
    noAffix = models.BooleanField(verbose_name='is addtach', null=True, blank=True)
    ignoreCache = models.BooleanField(verbose_name='ignorCache', null=True, blank=True)

    def __str__(self):
        return self.locale

    class Meta:
        verbose_name = 'RouteMeta'
        verbose_name_plural = verbose_name


class ChildMenuInfo(models.Model):
    path = models.CharField(verbose_name='Path', max_length=255)
    name = models.CharField(verbose_name='Name', max_length=255)
    meta = models.ForeignKey(verbose_name='MetaInfo', to=RouterMeta, on_delete=models.DO_NOTHING, null=True,
                             blank=True)
    children = models.ManyToManyField(verbose_name='ChildMenu', to='ChildMenuInfo', blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'ChileMenu'
        verbose_name_plural = verbose_name


class MenuInfo(models.Model):
    path = models.CharField(verbose_name='Path', max_length=255)
    name = models.CharField(verbose_name='Name', max_length=255)
    meta = models.ForeignKey(verbose_name='RouteMeta', to=RouterMeta, on_delete=models.DO_NOTHING, null=True,
                             blank=True)
    children = models.ManyToManyField(verbose_name='ChildMenu', to=ChildMenuInfo, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Menu'
        verbose_name_plural = verbose_name


class ServerData(models.Model):
    key = models.CharField(verbose_name='Key', max_length=250, unique=True)
    value = models.TextField(verbose_name='Value')

    class Meta:
        verbose_name = "ServerData"
        verbose_name_plural = verbose_name
