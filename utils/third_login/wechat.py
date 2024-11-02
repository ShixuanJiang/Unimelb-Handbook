
import json
import requests

# wechat login
# https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
WECHAT_LOGIN_URL = 'https://api.weixin.qq.com/sns/jscode2session'
WECHAT_APPID = "wx5b7c06b90ad88b2e"
WECHAT_APPSECRET = "34e812e4971501135ef8d8d6884ea863"


def get_wechat_login_result(code):
    """获取登录结果 返回OpenId

    Args:
        code (_type_): _description_

    Returns:
        _type_: _description_
    """
    req_url = f"{WECHAT_LOGIN_URL}"
    res = requests.get(req_url, params={
        'js_code': code,
        'secret': WECHAT_APPSECRET,
        'appid': WECHAT_APPID,
        'grant_type': 'authorization_code'
    })
    status_code = res.status_code
    if status_code != 200:
        return None
    response = res.content
    dict_res = json.loads(response)
    if "session_key" in dict_res:
        open_id = dict_res["openid"]
        return open_id
    return None
