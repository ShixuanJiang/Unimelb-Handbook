from django.urls import path, include
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, CourseListView,CoursePlanViewSet
import blog.views
from . import views


router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'coursesplan', CoursePlanViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('courses/', views.course_list, name='course_list'),
    # path('courseplan',views.CoursePlanViewSet),
    path('courses1/', CourseListView.as_view(), name='course-list'),
]
