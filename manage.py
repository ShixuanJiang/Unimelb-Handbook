#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

from utils.file_util import dirs_mk_static_list


def make_need_statics_folders():
    """ 构建静态文件夹
    :return:
    """
    static_name_list = ['admin', 'debug_toolbar',
                        'django_extensions', 'images', 'goods_images',
                        'import_export', 'rest_framework', 'drf_api_logger']
    dirs_mk_static_list(static_name_list)


def main():
    """Run administrative tasks."""
    make_need_statics_folders()
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'base.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
