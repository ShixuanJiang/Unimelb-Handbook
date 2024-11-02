from utils.rest_framework_util.error_info_list import ResponseError
from utils.rest_framework_util.response import rtn_success_info
from rest_framework.decorators import api_view, permission_classes, authentication_classes


@api_view(["GET"])
@permission_classes([])
@authentication_classes([])
def get_error_response_list(request):
    """获取错误码对应的错误信息

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """
    return rtn_success_info(ResponseError.to_json())
