from rest_framework.views import exception_handler
from utils.rest_framework_util.response import rtn_error_info
from utils.settings.log_config import logger
from utils.robots.dingding_robot import ding_msg


def custom_exception_handler(exc, context):
    """
    通用的异常处理
    """
    response = exception_handler(exc, context)
    if response is None:
        view = context['view']  # 出错的视图
        error = '服务器内部错误, %s' % exc
        logger.error('%s: %s' % (view, error))
        ding_msg(f"ERROR_RESPONSE:{error}")
        return rtn_error_info(msg=f"{error}，请联系:13824464121")

    return rtn_error_info(msg=response.status_text, code=response.status_code)
