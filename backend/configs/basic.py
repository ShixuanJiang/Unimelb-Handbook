
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

PROJECT_NAME = 'Backend'


@unique
class SoftEnvironment(Enum):
    DEV_ENVIR = 1  
    PRO_ENVIR = 2  
    LOCAL_ENVIR = 3  


DEFAULT_ENVIRONMENT = SoftEnvironment.PRO_ENVIR  

API_VERSION = 'v1'

SYS_LANGUAGE = 'en-us'
SYS_TIMEZONE = 'Asia/Shanghai' 
IS_DEBUG = True
CSRF_SITES = []
