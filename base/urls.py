"""base URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import debug_toolbar

from django.contrib import admin
from django.urls import include, path
from django.urls import re_path as url
from django.views.static import serve
from base import settings

from configs.basic import API_VERSION
from utils.rest_framework_util.response_view import get_error_response_list

# 使用 drf_yasg API文档生成器 视图和openapi
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# 导入权限控制模块
from rest_framework import permissions

# 文档视图
schema_view = get_schema_view(
    # API 信息
    openapi.Info(
        title='Django API 文档',  # API文档标题
        default_version='V1',  # 版本信息
        description='Django 项目接口文档',  # 描述内容
        terms_of_service='https://test.com',  # 开发团队地址
        # contact=openapi.Contact(email='https://test.@163com',url='https://test.com'),   # 联系人信息：邮件、网址
        # license=openapi.License(name='Test License'),    # 证书
    ),
    public=True,  # 是否公开
    permission_classes=(permissions.AllowAny,)  # 设置用户权限
)


def api(module: str):
    """api

    Args:
        module (str): _description_

    Returns:
        _type_: _description_
    """
    return fr"api/{module}/"


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    # apps 访问
    path(api('user'), include("apps.user.urls")),
    path(api('info'), include("apps.goods.urls")),
    path(api('timejob'), include("apps.timejob.urls")),

    path(api('error_response'), get_error_response_list,
         name="get_error_response"),  # 获取错误信息列表 通用接口
    # 实际业务

    path(api('swagger'), schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),  # 互动模式
    path(api('doc'), schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),  # 文档模式

    # 静态文件目录
    url(fr'^static/(?P<path>.*)$', serve,
        {'document_root': settings.STATIC_ROOT}, name='static'),

    url(fr'^staticfiles/(?P<path>.*)$', serve,
        {'document_root': settings.STATIC_ROOT}, name='staticfiles'),
    # admin 访问
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('__debug__/', include(debug_toolbar.urls)),

]
