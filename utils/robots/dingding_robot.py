import requests
import json

# Utils
from utils.robots.configs import DING_ROBOT_URL
from utils.settings.log_config import logger

__all__ = {
    'ding_msg'
}


def ding_msg(content: str) -> bool:
    """
    Args:
        content:

    Returns:

    """
    headers = {
        'Content-Type': 'application/json'
    }
    dict_content = {
        'content': 'RobotsMsg: ' + content
    }

    send_data = {
        'text': dict_content,
        'msgtype': "text"
    }
    try:
        req = requests.post(DING_ROBOT_URL, headers=headers,
                            data=json.dumps(send_data), timeout=10)
        response_data = json.loads(req.content.decode("utf-8"))
        if response_data["errcode"] == 0:
            logger.debug(f"机器人发送消息：\n{send_data}\n，发送成功")
            return True
        else:
            logger.error(f"机器人发送失败,错误码:{response_data['errcode']}")
            return False
    except Exception as e:
        logger.error(f"DingDing Hook Error:{e}")
        return False


if __name__ == "__main__":
    ding_msg("测试数据")
