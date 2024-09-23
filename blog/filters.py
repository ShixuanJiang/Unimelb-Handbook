# filters.py
import django_filters
from .models import Course
from django.db.models import Q

class CourseFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_search')
    level = django_filters.NumberFilter(method='filter_by_level')  # Add level filter

    class Meta:
        model = Course
        fields = []

    def filter_by_level(self, queryset, name, value):
        # Filters courses based on level (1–9)
        return queryset.filter(code__regex=r'^[A-Z]{4}%s[0-9]{4}$' % value)

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(title__startswith=value) |
            Q(code__startswith=value)
        )