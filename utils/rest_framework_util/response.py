# 响应统一格式处理
# { "code": xxx , message: "", data :""}
# code 500: 服务器的问题
# code 400: 前端的问题
# code 200: Success标志
from rest_framework.response import Response
from rest_framework import status
from utils.rest_framework_util.error_info_list import ErrorInfo

__all__ = {
    'rtn_info',
    'rtn_success_info',
    'rtn_error_info',
    'rtn_warning_info',
}


def rtn_warning_info(error_info: ErrorInfo, data=''):
    value_list = error_info.value
    rtn_data = {
        'code': value_list[0],
        'msg': value_list[1],
        'data': data,
        'status': 0
    }
    return Response(rtn_data, status=status.HTTP_200_OK)


def rtn_info(code, data, msg=''):
    """
    通用返回格式
    """
    if code == 200 and msg == '':
        msg = 'success'
    else:
        if msg == '':
            msg = 'failure'
    rtn_data = {
        'code': code,
        'msg': msg,
        'data': data,
        'status': 0
    }
    return Response(rtn_data, status=status.HTTP_200_OK)


def rtn_success_info(data='', msg=''):
    """
    成功返回格式
    data:返回数据
    msg:提示信息
    """
    if msg == "":
        msg = 'success'
    rtn_data = {
        'code': 200,
        'msg': msg,
        'data': data,
        'status': 0
    }
    return Response(rtn_data, status=status.HTTP_200_OK)


def rtn_error_info(msg='', code=500):
    """
    失败返回格式
    """
    if msg == "":
        msg = "error"
    rtn_data = {
        'code': code,
        'msg': msg,
        'data': "",
        'status': 0
    }
    return Response(rtn_data, status=status.HTTP_200_OK)


if __name__ == "__main__":
    rtn_warning_info(ErrorInfo.ERR)
