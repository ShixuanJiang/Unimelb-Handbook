from django.db import models
from django.contrib.auth.models import AbstractUser

# Create Model:之后需要在admin.py 注册这个Model

__all__ = {
    "User",
    "UserLoggerInfo",
    "ServerData",
    "RouterMeta"
}


class User(AbstractUser):
    phone = models.CharField(max_length=11, blank=True, help_text="手机号",
                             default="13824464121", verbose_name="手机号", auto_created=True)
    is_delete = models.BooleanField(verbose_name="是否软删除", default=False)

    # acro admin
    name = models.CharField(verbose_name='名字', default='杜辉锋', null=True, blank=True, max_length=255)
    job = models.CharField(verbose_name='工作', default='SoftJob', null=True, blank=True, max_length=255)
    jobName = models.CharField(verbose_name='工作名称', default='软件开发负责人', null=True, blank=True, max_length=255)
    organizationName = models.TextField(verbose_name='组织名称', null=True, default='Front', blank=True)
    locationName = models.TextField(verbose_name='位置名称', null=True, default='上海', blank=True)
    avatar = models.URLField(verbose_name='头像',
                             default='https://ytouch-1258011219.cos.ap-nanjing.myqcloud.com/ww.jpg',
                             null=True, blank=True)
    organization = models.TextField(verbose_name='组织', null=True, default='Front', blank=True)
    location = models.TextField(verbose_name='位置', null=True, default='ShangHai', blank=True)
    introduction = models.TextField(verbose_name='介绍', null=True, default='做音乐，艺术家！', blank=True)
    personalWebsite = models.URLField(verbose_name='个人网站', default='https://github.com/huifeng-kooboo', null=True,
                                      blank=True)
    registrationDate = models.DateTimeField(verbose_name='注册日期', auto_created=True, auto_now=True)
    accountId = models.CharField(verbose_name='账号id', default='13824464121', null=True, blank=True, max_length=255)
    certification = models.IntegerField(verbose_name='认证类型', default=1)
    ROLE_TYPE = (
        ('admin', '管理员'),
        ('user', '普通用户')
    )
    role = models.CharField(verbose_name='角色', choices=ROLE_TYPE, default='admin', null=True, blank=True,
                            max_length=255)

    class Meta:
        verbose_name = "用户表"
        verbose_name_plural = verbose_name

    def __str__(self):
        return f"{self.username}_{self.phone}"


class UserLoggerInfo(models.Model):
    user = models.ForeignKey(
        to=User, on_delete=models.CASCADE, verbose_name='归属用户')

    logger_info = models.TextField(null=True, blank=True, help_text="日志内容记录",
                                   verbose_name="日志内容")

    create_time = models.DateTimeField(verbose_name='创建时间', auto_now_add=True)
    update_time = models.DateTimeField(verbose_name='更新时间', auto_now=True)

    class Meta:
        verbose_name = '用户日志记录表'
        verbose_name_plural = verbose_name


class RouterMeta(models.Model):
    roles = models.CharField(verbose_name='页面角色列表', max_length=255, null=True, blank=True)
    requiresAuth = models.BooleanField(verbose_name='是否需要鉴权', default=False)
    icon = models.CharField(verbose_name='icon图标', null=True, blank=True, max_length=255)
    locale = models.CharField(verbose_name='locale', default='', null=True, blank=True, max_length=255)
    hideInMenu = models.BooleanField(verbose_name='是否在左侧菜单中隐藏该项', null=True, blank=True)
    hideChildrenInMenu = models.BooleanField(verbose_name='强制在左侧菜单中显示单项', null=True, blank=True)
    activeMenu = models.CharField(verbose_name='高亮显示的菜单项', max_length=255, null=True, blank=True)
    order = models.IntegerField(verbose_name='菜单项顺序', null=True, blank=True)
    noAffix = models.BooleanField(verbose_name='标签是否添加到tab-bar', null=True, blank=True)
    ignoreCache = models.BooleanField(verbose_name='忽略缓存', null=True, blank=True)

    def __str__(self):
        return self.locale

    class Meta:
        verbose_name = '路由元信息'
        verbose_name_plural = verbose_name


class ChildMenuInfo(models.Model):
    path = models.CharField(verbose_name='路径', max_length=255)
    name = models.CharField(verbose_name='名称', max_length=255)
    meta = models.ForeignKey(verbose_name='路由元信息', to=RouterMeta, on_delete=models.DO_NOTHING, null=True,
                             blank=True)
    children = models.ManyToManyField(verbose_name='子菜单', to='ChildMenuInfo', blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '子菜单'
        verbose_name_plural = verbose_name


class MenuInfo(models.Model):
    path = models.CharField(verbose_name='路径', max_length=255)
    name = models.CharField(verbose_name='名称', max_length=255)
    meta = models.ForeignKey(verbose_name='路由元信息', to=RouterMeta, on_delete=models.DO_NOTHING, null=True,
                             blank=True)
    children = models.ManyToManyField(verbose_name='子菜单', to=ChildMenuInfo, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '菜单'
        verbose_name_plural = verbose_name


class ServerData(models.Model):
    key = models.CharField(verbose_name='参数', max_length=250, unique=True)
    value = models.TextField(verbose_name='值')

    class Meta:
        verbose_name = "服务数据"
        verbose_name_plural = verbose_name
