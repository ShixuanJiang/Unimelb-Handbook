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


class UserListViewSet(CommonViewSet):
    """
    UserInfo
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = (permissions.IsAuthenticated)
    authentication_classes = [JWTAuthentication, authentication.SessionAuthentication,
                              authentication.BasicAuthentication]

    def get_queryset(self):
        return User.objects.filter(is_child_user=False)


class UserViewSet(CommonViewSet):
    """
    UserInfo
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = (permissions.IsAuthenticated)
    authentication_classes = [JWTAuthentication, authentication.SessionAuthentication,
                              authentication.BasicAuthentication]

    def list(self, request):
        user = request.user
        user_data = UserSerializer(user).data
        return rtn_success_info(data=user_data)

    @action(detail=False, methods=['POST'])
    def add_user(self, request):
        """
        添加用户
        Args:
            request:
        Returns:
        """
        username = request.data.get('username', None)
        if User.objects.filter(username=username).exists():
            return rtn_error_info("当前存在该用户名")
        password = request.data.get('password', None)
        User.objects.update_or_create(username=username, defaults={
            'password': make_password(password)
        })
        return rtn_success_info(data={'username': username, 'password': make_password(password)}, msg='添加用户成功')

    @action(detail=False, methods=['POST'])
    def modify_user_password(self, request):
        username = request.data.get('username', None)
        if not User.objects.filter(username=username).exists():
            return rtn_error_info("当前不存在该用户")
        password = request.data.get('password', None)
        User.objects.update_or_create(username=username, defaults={
            'password': make_password(password)
        })
        return rtn_success_info(data={'username': username, 'password': make_password(password)}, msg='修改密码成功')

    @action(detail=False, methods=['GET'])
    def menu_list(self, request):
        # 临时todo
        if request.user.is_superuser:
            data_info = [
                {
                    "path": "/list",
                    "name": "list",
                    "meta": {
                        "locale": "menu.list",
                        "requiresAuth": True,
                        "icon": "icon-list",
                        "order": 2
                    },
                    "children": [
                        {
                            "path": "search-table",
                            "name": "SearchTable",
                            "meta": {
                                "locale": "menu.list.searchTable",
                                "requiresAuth": True,
                                "roles": [
                                    "*"
                                ]
                            }
                        },
                        {
                            "path": "subchannel",
                            "name": "SubChannel",
                            "meta": {
                                "locale": "menu.list.sub_channel",
                                "requiresAuth": True,
                                "roles": [
                                    "*"
                                ]
                            }
                        }
                    ]
                },
                {
                    "path": "/user",
                    "name": "user",
                    "meta": {
                        "locale": "menu.user",
                        "icon": "icon-user",
                        "requiresAuth": True,
                        "order": 7
                    },
                    "children": [
                        {
                            "path": "password",
                            "name": "Password",
                            "meta": {
                                "locale": "menu.user.password",
                                "requiresAuth": True,
                                "roles": [
                                    "*"
                                ]
                            }
                        },
                        {
                            "path": "manager",
                            "name": "Manager",
                            "meta": {
                                "locale": "menu.user.manager",
                                "requiresAuth": True,
                                "roles": [
                                    "*"
                                ]
                            }
                        }
                    ]
                }
            ]
            return rtn_success_info(data_info, msg='获取菜单成功')
        else:
            data_info = [
                {
                    "path": "/list",
                    "name": "list",
                    "meta": {
                        "locale": "menu.list",
                        "requiresAuth": True,
                        "icon": "icon-list",
                        "order": 2
                    },
                    "children": [
                        {
                            "path": "search-table",
                            "name": "SearchTable",
                            "meta": {
                                "locale": "menu.list.searchTable",
                                "requiresAuth": True,
                                "roles": [
                                    "*"
                                ]
                            }
                        }
                    ]
                },
                {
                    "path": "/user",
                    "name": "user",
                    "meta": {
                        "locale": "menu.user",
                        "icon": "icon-user",
                        "requiresAuth": True,
                        "order": 7
                    },
                    "children": [
                        {
                            "path": "password",
                            "name": "Password",
                            "meta": {
                                "locale": "menu.user.password",
                                "requiresAuth": True,
                                "roles": [
                                    "*"
                                ]
                            }
                        }
                    ]
                }
            ]
            return rtn_success_info(data_info, msg='获取菜单成功')

    @action(detail=False, methods=['POST'])
    @transaction.atomic
    def reset_password(self, request):
        old_password = request.data.get('old_password', None)
        new_password = request.data.get('new_password', None)
        user = request.user
        if not user.check_password(old_password):
            return rtn_error_info("旧的密码错误")
        user.set_password(new_password)
        user.save()
        return rtn_success_info("", "设置新密码成功")

    @action(detail=False, methods=['GET'])
    @transaction.atomic
    def user_name_list(self, request):
        user_list = User.objects.filter(is_child_user=False).values("username")  # 获取非子渠道的用户
        user_name_list = []
        for user_ in user_list:
            if user_.get('username') == request.user.username:
                continue
            user_name_list.append(user_['username'])
        return rtn_success_info(data={
            'username_list': user_name_list
        }, msg='get user_name list success')


class UserBaseViewSet(viewsets.ModelViewSet):
    """
    Test-API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserBaseSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserLoginView(TokenObtainPairView):
    permission_classes = ()
    authentication_classes = ()

    def post(self, request, *args, **kwargs):
        password = request.data.get("password", None)
        username = request.data.get("username", None)
        logger.info(f"[REQUEST_PARAMS]username:{username},password:{password}")
        if password is None or username is None:
            return rtn_error_info(f"【WARNING】username or password is empty data.")
        if len(password) < 7:
            return rtn_error_info(f"【ERROR】password error!")
        data = {
            "password": password,
            "username": username
        }
        serializer = self.get_serializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            logger.error("TokenERROR")
            return rtn_error_info("【ERROR】Token错误", code=401)
        except InvalidToken as e:
            logger.error("InvalidToken")
            return rtn_error_info("【ERROR】Token无效", code=502)
        except:
            logger.error("Missing Thing")
            return rtn_warning_info(ErrorInfo.LOGIN_ERROR_USERNAME_PASSWORD)
        result = serializer.validated_data
        ding_msg(f"用户:{username}登录成功")
        arco_response = {
            'token': result['access']
        }
        return rtn_success_info(arco_response, "用户登录成功")


@api_view(["POST"])
@permission_classes([])
@authentication_classes([])
def register_user_view(request):
    username = request.data.get("username", None)
    password = request.data.get("password", None)
    if username is None or password is None:
        return rtn_warning_info(ErrorInfo.REGISTER_NONE_INFO)
    is_check, result = check_register_info(username, password)
    if not is_check:
        return rtn_error_info(result)
    password = make_password(password, None, 'pbkdf2_sha1')
    if User.objects.filter(username=username).count() > 0:
        return rtn_warning_info(ErrorInfo.REGISTER_SAME_USER)  # 当前用户已存在
    user = User.objects.create(username=username, password=password)
    user.save()
    return rtn_success_info(data="", msg="用户注册成功")
