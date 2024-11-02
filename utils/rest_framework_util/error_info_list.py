# 定义一些错误码及错误提示
from enum import Enum, unique
import json


@unique
class ErrorInfo(Enum):
    """定义相关的错误信息和错误提示

    Args:
        Enum (_type_): _description_
    """
    ERR = (401, "错误")
    ERRWW = (402, "错误")
    NOT_FOUND = (404, '资源未找到')
    CONFLICT = (409, "CONFLICT 请求状态冲突")
    GONE = (410, "资源不可用")
    REQUEST_LARGE = (413, "实体数据过大")
    REQUEST_URI_LONG = (414, "请求长度超过 服务器能够解释的长度")
    LENGTH_REQUIRE = (411, "服务器拒绝在没有定义 Content-Length 头的情况下接受请求")

    # ----------500---->600-----------------------
    NOT_IMPLEMENT = (501, "服务器不支持请求的处理,源码异常")
    BAD_GATEWAY = (502, "网关错误")
    UNAVAILABLE_SERVICE = (503, "服务不可用")
    GATEWAY_TIMEOUT = (504, "网关异常")
    HTTP_VERSION_NOT_SUPPORT = (505, "服务器版本不支持")
    VARIANT_ALSO_NEGOTIATE = (506, "服务器存在内部配置错误")
    INSUFFICIENT_STORAGE = (507, "服务器无法存储完成请求所必须的内容")
    BANDWIDTH_LIMIT = (509, "带宽限制")
    NOT_EXTENDED = (510, "获取资源所需要的策略并没有被满足")
    UN_PARSE_ABLE_RESPONSE_HEADERS = (600, "源站没有返回响应头部，只返回实体内容")

    # -----------------------service层 700--->1000-----------
    # 用户注册
    REGISTER_SAME_USER = (701, "该用户已创建，无需重复注册")
    REGISTER_NONE_INFO = (702, "用户未输入密码或账号，请检查")
    REGISTER_PARAM_LOSS_INFO = (703, '账号注册，注册参数缺失')

    # 用户登录
    LOGIN_WECHAT_UNCODE = (710, "微信用户CODE错误")
    LOGIN_ERROR_USERNAME_PASSWORD = (711, "用户账号或密码错误")


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
