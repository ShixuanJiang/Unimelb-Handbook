from django.urls import path, include
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet
import blog.views
from . import views


router = DefaultRouter()
router.register(r'courses', CourseViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('courses/', views.course_list, name='course_list'),
]
