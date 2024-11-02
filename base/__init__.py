import os
# mysql依赖pymysql
import pymysql

pymysql.version_info = (1, 4, 3, "final", 0)
pymysql.install_as_MySQLdb()


def init():
    if not os.path.exists('logs'):
        os.mkdir('logs')
    if not os.path.exists('static'):
        os.mkdir('static')


init()
