from django.urls import include, path, re_path
from rest_framework import routers
from apps.user.views import UserBaseViewSet, UserLoginView, register_user_view, UserViewSet, UserListViewSet, \
    MenuInfoViewSet

router = routers.DefaultRouter()
router.register(r'test-users', UserBaseViewSet)
router.register(r'info', UserViewSet)  # 获取用户个人信息
router.register(r'user_list', UserListViewSet)
router.register(r'menu_info', MenuInfoViewSet)  # 获取菜单信息

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    re_path(r"^login", UserLoginView.as_view(), name="user_login"),
    re_path(r"^register", register_user_view, name="user_register")
]
