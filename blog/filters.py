# filters.py
import django_filters
from .models import Course
from django.db.models import Q

class CourseFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_search', label = "search")
    level_1_to_4 = django_filters.BooleanFilter(method='filter_level_1_to_4', label="Undergraduate Coursework")
    level1 = django_filters.BooleanFilter(method='filter_by_level', label = "level1")  # Level filter
    level2 = django_filters.BooleanFilter(method='filter_by_level', label = "level2")  # Level filter
    level3 = django_filters.BooleanFilter(method='filter_by_level', label = "level3")  # Level filter
    level4 = django_filters.BooleanFilter(method='filter_by_level', label = "level4")  # Level filter
    level9 = django_filters.BooleanFilter(method='filter_by_level', label="All Graduate Coursework")
    semester1 = django_filters.BooleanFilter(method='filter_by_semester', label="Semester 1")
    semester2 = django_filters.BooleanFilter(method='filter_by_semester', label="Semester 2")
    summer_term = django_filters.BooleanFilter(method='filter_by_semester', label="Summer Term")
    class Meta:
        model = Course
        fields = []

    def filter_by_level(self, queryset, name, value):
        # Filters courses based on level (1–9) using improved f-string formatting
        if value:
            # Extract the level number from the filter name (e.g., level1, level2, etc.)
            level = name[-1]  # Gets the level number from the name (e.g., "1", "2", "3", "4")
            return queryset.filter(code__regex=rf'^[A-Z]{{4}}{level}[0-9]{{4}}$')
        return queryset
    def filter_level_1_to_4(self, queryset, name, value):
        # Filter for level 1 to 4 courses only when the filter is set to True
        if value:
            return queryset.filter(code__regex=r'^[A-Z]{4}[1-4]{1}[0-9]{4}$')
        return queryset

    def filter_search(self, queryset, name, value):
        # Adding case-insensitive search for more flexibility
        return queryset.filter(
            Q(title__icontains=value) |  # Use icontains for case-insensitive matching
            Q(code__icontains=value)
        )

    def filter_by_semester(self, queryset, name, value):
        # Filters based on specific semester when BooleanFilter is True
        if value:
            if name == 'semester1':
                return queryset.filter(info__icontains='semester 1')
            elif name == 'semester2':
                return queryset.filter(info__icontains='semester 2')
            elif name == 'summer_term':
                return queryset.filter(info__icontains='summer term')
        return queryset