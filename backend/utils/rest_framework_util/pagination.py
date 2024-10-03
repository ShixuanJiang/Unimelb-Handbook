from rest_framework.pagination import PageNumberPagination

__all__ = {
    'CommonPagination'
}


class CommonPagination(PageNumberPagination):
    """
          
    """
    page_size = 20
    page_query_param = 'current'
    page_size_query_param = 'pageSize'
    max_page_size = 1000
