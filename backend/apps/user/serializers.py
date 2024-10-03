from rest_framework import serializers
from apps.user.models import User
from apps.user import models

from django.db.models import ManyToManyRel


class MetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RouterMeta
        fields = '__all__'


class ChildMenuInfoSerializer(serializers.ModelSerializer):
    meta = serializers.SerializerMethodField()
    children = serializers.SerializerMethodField()

    def get_meta(self, obj):
        meta_ = obj.meta
        if meta_ is None:
            return None
        json_data = MetaSerializer(meta_).data
        response = {}
        for data, key_value in json_data.items():
            if key_value is not None:
                response[data] = key_value
        return response

    def get_children(self, obj):
        meta_ = obj.children
        if meta_ is None or len(meta_.all()) == 0:
            return None
        response_data = []
        for info in meta_.all():
            json_data = ChildMenuInfoSerializer(info).data
            response_dict = {}
            for data, key_value in json_data.items():
                if key_value is not None:
                    response_dict[data] = key_value
            response_data.append(response_dict)
        return response_data

    class Meta:
        model = models.ChildMenuInfo
        fields = '__all__'


class MenuInfoSerializer(serializers.ModelSerializer):
    meta = serializers.SerializerMethodField()
    children = serializers.SerializerMethodField()

    def get_meta(self, obj):
        meta_ = obj.meta
        if meta_ is None:
            return None
        json_data = MetaSerializer(meta_).data
        response = {}
        for data, key_value in json_data.items():
            if key_value is not None:
                response[data] = key_value
        return response

    def get_children(self, obj):
        meta_ = obj.children
        if meta_ is None or len(meta_.all()) == 0:
            return None
        # ManyRelatedManager
        response_data = []
        for info in meta_.all():
            response_data.append(ChildMenuInfoSerializer(info).data)
        return response_data

    class Meta:
        model = models.MenuInfo
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserBaseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']
