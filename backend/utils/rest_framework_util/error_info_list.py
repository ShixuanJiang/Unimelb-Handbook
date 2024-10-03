#             
from enum import Enum, unique
import json


@unique
class ErrorInfo(Enum):
    """              

    Args:
        Enum (_type_): _description_
    """
    ERR = (401, "  ")
    ERRWW = (402, "  ")
    NOT_FOUND = (404, '     ')
    CONFLICT = (409, "CONFLICT       ")
    GONE = (410, "     ")
    REQUEST_LARGE = (413, "      ")
    REQUEST_URI_LONG = (414, "                 ")
    LENGTH_REQUIRE = (411, "           Content-Length          ")

    # ----------500---->600-----------------------
    NOT_IMPLEMENT = (501, "           ,    ")
    BAD_GATEWAY = (502, "    ")
    UNAVAILABLE_SERVICE = (503, "     ")
    GATEWAY_TIMEOUT = (504, "    ")
    HTTP_VERSION_NOT_SUPPORT = (505, "        ")
    VARIANT_ALSO_NEGOTIATE = (506, "           ")
    INSUFFICIENT_STORAGE = (507, "                 ")
    BANDWIDTH_LIMIT = (509, "    ")
    NOT_EXTENDED = (510, "                ")
    UN_PARSE_ABLE_RESPONSE_HEADERS = (600, "          ，       ")

    # -----------------------service  700--->1000-----------
    #     
    REGISTER_SAME_USER = (701, "      ，      ")
    REGISTER_NONE_INFO = (702, "          ，   ")
    REGISTER_PARAM_LOSS_INFO = (703, '    ，      ')

    #     
    LOGIN_WECHAT_UNCODE = (710, "    CODE  ")
    LOGIN_ERROR_USERNAME_PASSWORD = (711, "         ")


class ResponseError:
    @staticmethod
    def to_json():
        response_json = {}
        for error_info in ErrorInfo:
            response_json[error_info.name] = error_info.value
        return response_json

    @staticmethod
    def to_str():
        return json.dumps(ResponseError.to_json())


if __name__ == "__main__":
    print('Hello World')
