# Sys ModuleW
import sys
import random
import string
import time

import datetime

# Utils
from utils.settings.log_config import logger

__all__ = {
    'is_apple_system',
    'is_win_system',
    'is_linux_system',
    'generate_random_str',
    'time_count',
    'get_current_time_format'
}


def get_current_time_format(format_info: str = None):
    """
    获取当前的时间的格式化 [ex: 2023-02-25 11:22:11]
    :param format_info:
    :return:
    """
    if format_info is None:
        return datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    else:
        return datetime.datetime.now().strftime(format_info)


def check_register_info(username: str, password: str):
    if len(username) > 20 or len(username) < 6:
        print(f"len:{len(username)}")
        return False, "用户名过长或者过短"
    if len(password) > 20 or len(password) < 6:
        print(f"len:{len(password)}")
        return False, "密码过长或者过短"
    return True, "注册信息规则检测成功"


def is_apple_system():
    """
    des: 判断是否为苹果系统
    """
    if sys.platform == "darwin":
        return True
    else:
        return False


def is_win_system():
    """
    判断是否为win系统
    """
    if sys.platform == "win32":
        return True
    else:
        return False


def is_linux_system():
    """
    判断是否为Linux系统
    """
    if not is_apple_system() and not is_win_system():
        return True
    return False


def get_os_system_name():
    if is_apple_system():
        return "mac"
    if is_win_system():
        return 'win'
    return 'linux'


def generate_random_str(random_num: int = 10) -> str:
    """ 生成随机数

    Args:
        random_num (int, optional): _description_. Defaults to 10.

    Returns:
        str: 随机数
    """
    if random_num < 3 or random_num > 30:
        return None
    random_str = random.sample(
        string.ascii_letters + string.digits, random_num)
    return ''.join(random_str)


def time_count(func):
    """函数时间统计的装饰器

    Args:
        func (_type_): _description_
    """

    def inner(*s, **ags):
        time_start = time.time() * 1000
        res = func(*s, **ags)
        time_end = time.time() * 1000
        logger.info(
            f"Func:{func.__name__}\nRunCost:{(time_end - time_start)}ms")
        return res

    return inner


if __name__ == '__main__':
    check_register_info("udisuaiduiaduadiudaiusjidsuiasdujsd", "dsaa122")
