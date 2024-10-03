import os
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import viewsets
from rest_framework import filters
from rest_framework import permissions, authentication
from rest_framework.decorators import action
from rest_framework_simplejwt.authentication import JWTAuthentication

from utils.rest_framework_util.pagination import CommonPagination
from utils.rest_framework_util.response import rtn_success_info, rtn_error_info
from utils.rest_framework_util.excel_util import ExcelUtil, write_excel_file
from utils.utils import get_current_time_format
__all__ = {
    "CommonViewSet",
    "CommonUserViewSet"
}


class CommonViewSet(viewsets.ModelViewSet):
    permission_classes = ()
    authentication_classes = ()

    filter_backends = [filters.SearchFilter, DjangoFilterBackend]

    search_fields = ["id"]
    save_export_folder = "static/save_export/"
    pagination_class = CommonPagination

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        len_model = len(queryset)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response_data = {
                "total": len_model,
                "list": serializer.data
            }
            return rtn_success_info(response_data, msg="      ")
        serializer = self.get_serializer(queryset, many=True)
        return rtn_success_info(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return rtn_success_info(serializer.data)

    def update(self, request, *args, **kwargs):
        """
        put   
        """
        try:
            partial = kwargs.pop('partial', False)
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}

            return rtn_success_info(serializer.data, msg='      ')
        except Exception as e:
            return rtn_error_info(msg=e)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return rtn_success_info(msg="      ")

    def perform_destroy(self, instance):
        instance.delete()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return rtn_success_info(serializer.data, msg="      ")

    @action(detail=False, methods=['POST'])
    def data_import(self, request, *args, **kwargs):
        response_data_list = []
        file = request.FILES.get("file", None)
        if file is None:
            return rtn_error_info("    file  ")
        else:
            title_list, data_list = ExcelUtil(file).read_data()
            serializer_class = self.get_serializer_class()
            model = serializer_class.Meta.model
            try:
                if model is not None:
                    model.objects.create()
                    for create_data in data_list:
                        response_data = {}
                        for index_, title in enumerate(title_list):
                            response_data[title] = create_data[index_]
                        if response_data.get('id', None) is not None:
                            response_data.pop("id")
                        serializer = self.get_serializer(data=response_data)
                        if serializer.is_valid():
                            #   
                            self.perform_create(serializer)
            except Exception as e:
                return rtn_error_info(f"      :{e}")
            response_data_list = data_list
        return rtn_success_info(data=response_data_list, msg='      ')

    @action(detail=False, methods=['GET'])
    def all(self, request, *args, **kwargs):
        serializer_data = self.get_serializer(self.get_queryset(), many=True)
        return rtn_success_info(data=serializer_data.data)

    @action(detail=False, methods=['POST'])
    def data_delete(self, request, *args, **kwargs):
        ids = request.data.get('ids', [])
        if len(ids) == 0:
            return rtn_error_info(msg='         ')
        serializer_class = self.get_serializer_class()
        model = serializer_class.Meta.model
        for id in ids:
            model.objects.filter(id=id).delete()
        return rtn_success_info('', msg='      ')

    @action(detail=False, methods=['POST'])
    def data_export(self, request, *args, **kwargs):
        id_list = request.data.get('ids', None)
        queryset = self.get_queryset()
        row_data_list = []
        is_first = False
        title_list = []
        title = ""
        for data in queryset:
            title = data.__class__.__name__
            if not is_first:
                data_list = []
                for data_meta in data._meta.fields:
                    data_list.append(data_meta.name)
                    title_list.append(data_meta.name)
                row_data_list.append(data_list)  # title
                is_first = True
                break

        for value_data in queryset.values():
            data_info = []
            if id_list is not None:
                for id_ in id_list:
                    if int(value_data['id']) == int(id_):
                        for title in title_list:
                            data_info.append(value_data[title])
            else:
                for title in title_list:
                    data_info.append(value_data[title])
            if len(data_info) > 0:
                row_data_list.append(data_info)
        excel_file_name = f"{title}_{get_current_time_format('%Y_%m_%d_%H_%M_%S')}.xlsx"
        if not os.path.exists(self.save_export_folder):
            os.makedirs(self.save_export_folder)
        write_excel_file(row_data_list, f"{self.save_export_folder}{excel_file_name}")
        if os.path.exists(f"{self.save_export_folder}{excel_file_name}"):
            url = CommonUpload().cos_upload_file(f"{self.save_export_folder}{excel_file_name}")
            data = {
                'excel_url': url
            }
            return rtn_success_info(data, '    ')
        return rtn_error_info("    ")


class CommonUserViewSet(CommonViewSet):
    """      ViewSet

    Args:
        viewsets (_type_): _description_

    Returns:
        _type_: _description_
    """

    permission_classes = (permissions.IsAuthenticated)
    authentication_classes = [JWTAuthentication, authentication.SessionAuthentication,
                              authentication.BasicAuthentication]

    def create(self, request, *args, **kwargs):
        data = request.data
        data["user"] = request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return rtn_success_info(serializer.data, msg="      ")
