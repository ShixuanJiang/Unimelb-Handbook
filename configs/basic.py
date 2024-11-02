# 基础相关配置
from enum import Enum, unique

__all__ = {
    'SYS_LANGUAGE',
    'SYS_TIMEZONE',
    'IS_DEBUG',
    'API_VERSION',
    'DEFAULT_ENVIRONMENT',
    'PROJECT_NAME',
    'CSRF_SITES'
}

# 项目名称
PROJECT_NAME = 'ArcoBackend'


@unique
class SoftEnvironment(Enum):
    DEV_ENVIR = 1  # 测试环境
    PRO_ENVIR = 2  # 生产环境
    LOCAL_ENVIR = 3  # 本地环境


DEFAULT_ENVIRONMENT = SoftEnvironment.PRO_ENVIR  # 默认生产环境

# 当前后端版本 默认v1 影响到接口
API_VERSION = 'v1'

# 管理员显示界面：默认中文  英文:'en-us'
SYS_LANGUAGE = 'zh-hans'

# 系统的时间格式 默认UTC
SYS_TIMEZONE = 'Asia/Shanghai'  # 调整成上海时间

# 是否为Debug模式：在发布的时候需要关闭
IS_DEBUG = True

# 需要过滤的网站地址
CSRF_SITES = ['https://dd.haibangtui.com', 'https://360jietiaoht.haishuju.vip']
