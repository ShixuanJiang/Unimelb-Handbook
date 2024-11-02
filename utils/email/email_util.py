import yagmail

from utils.settings.log_config import logger

__all__ = {
    "EmailUtil"
}

default_email = "942840260@qq.com"
default_email_code = "gdwhcgqdcyqjbfib"


class EmailUtil:
    def __init__(self, verify_email: str = default_email, verify_code: str = default_email_code,
                 host_url: str = "smtp.qq.com"):
        self.yag = yagmail.SMTP(
            user=verify_email, password=verify_code, host=host_url)
        self.email_addr = ""

    def set_send_email_addr(self, email_addr: str):
        self.email_addr = email_addr

    def send_email(self, email_msg: str, email_title: str = "", email_addr: str = None, attachments=None):
        if email_addr is None:
            if self.email_addr == "":
                logger.error("当前不存在发送的地址")
                return
        else:
            self.email_addr = email_addr
        is_error = self.yag.send(
            to=self.email_addr, subject=email_title, contents=email_msg, attachments=attachments)
        if not is_error:
            logger.info(f"成功发送:{self.email_addr}")
        else:
            logger.error(f"发送失败 原因:{is_error}")


if __name__ == "__main__":
    logger.debug("email_test_begin")
    email_tools = EmailUtil()
    email_tools.send_email("测试功能", "测试功能啦", "942840260@qq.com")
    logger.debug("email_test_end")
