from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import Course
from .serializers import CourseSerializer
from django.shortcuts import render
# Create your views here.

def hello_world(request):
    return HttpResponse("Hello World")

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

def course_list(request):
    courses = Course.objects.all()
    return render(request, 'courses/course_list.html', {'courses': courses})