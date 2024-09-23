from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import Course
from .serializers import CourseSerializer
from django.shortcuts import render
from rest_framework import generics
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .filters import CourseFilter
# Create your views here.

def hello_world(request):
    return HttpResponse("Hello World")

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

def course_list(request):
    courses = Course.objects.all()
    return render(request, 'courses/course_list.html', {'courses': courses})

class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = CourseFilter