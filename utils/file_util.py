import os

__all__ = {
    'dirs_mk',
    'dirs_mk_static',
    'dirs_mk_static_list'
}


class FileUtil(object):
    """文件Util类

    Args:
        object (_type_): _description_
    """

    def __init__(self) -> None:
        pass

    @staticmethod
    def mk_dir(folder_path: str):
        if not os.path.isdir(folder_path) or not os.path.exists(folder_path):
            os.makedirs(folder_path)
            return True
        return False

    @staticmethod
    def mk_file(file_path: str, is_rewrite: bool = False):
        """
        创建文件
        Args:
            file_path:
            is_rewrite:
        Returns:
        """
        if os.path.exists(file_path):
            if is_rewrite:
                os.remove(file_path)
        else:
            with open(file_path, 'w') as f:
                f.close()


def dirs_mk(folder_path):
    """
    创建文件夹
    """
    if not os.path.exists(folder_path) or not os.path.isdir(folder_path):
        os.makedirs(folder_path)
        return True
    else:
        return False


def dirs_mk_static(static_name: str):
    """
    """
    dirs_mk(f"static/{static_name}")


def dirs_mk_static_list(static_name_list: list):
    """ 构造静态文件夹

    Args:
        static_name_list (list): _description_
    """
    for static_name in static_name_list:
        dirs_mk_static(static_name)
