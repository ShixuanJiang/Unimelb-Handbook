from django.contrib.auth.hashers import make_password
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from apps.user.models import User, MenuInfo
from apps.user.serializers import UserBaseSerializer, UserSerializer, MenuInfoSerializer
from rest_framework.decorators import action
from utils.rest_framework_util.viewset import CommonViewSet
from utils.rest_framework_util.response import rtn_error_info, rtn_success_info, rtn_warning_info
from utils.rest_framework_util.error_info_list import ErrorInfo
from utils.settings.log_config import logger
from utils.robots.dingding_robot import ding_msg
from utils.utils import check_register_info
from rest_framework import permissions, authentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db import transaction


class MenuInfoViewSet(CommonViewSet):
    queryset = MenuInfo.objects.all()
    serializer_class = MenuInfoSerializer


