from django.urls import include, path
from rest_framework import routers
from apps.goods import views

router = routers.DefaultRouter()
router.register(r'bachor', views.BachorInfoViewSet)
router.register(r'subject', views.SubjectInfoViewSet)
router.register(r'template',views.TemplateRecordViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
]
