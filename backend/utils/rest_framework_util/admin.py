from typing import Sequence

# Django
from django.contrib import admin
from django.contrib.admin.sites import AdminSite
from django.http.request import HttpRequest
from django.db.models.fields.related import ForeignKey

from import_export import resources
from import_export.admin import ImportExportModelAdmin


class CommonAdmin(object):

    def __init__(self, base_model):
        self.base_model = base_model

        class AdminResource(resources.ModelResource):
            class Meta:
                model = self.base_model

        class CommonImportExportAdmin(ImportExportModelAdmin):
            resource_class = AdminResource

        @admin.register(self.base_model)
        class DefaultAdmin(CommonImportExportAdmin):
            def __init__(vef, model: type, admin_site: AdminSite) -> None:
                super().__init__(model, admin_site)

            def get_list_display(self, request: HttpRequest) -> Sequence[str]:
                temp_list = []
                for filed in base_model._meta.fields:
                    temp_list.append(filed.name)
                tuple_list = tuple(temp_list)
                return tuple_list

            def get_search_fields(self, request):
                temp_list = []
                for filed in base_model._meta.fields:
                    if type(filed) == ForeignKey:
                        continue
                    temp_list.append(filed.name)
                return temp_list
