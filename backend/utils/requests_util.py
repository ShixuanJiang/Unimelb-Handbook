'''
'''
import requests
import functools
import traceback
import logging

logger = logging.getLogger()

default_header = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
}


def retry(count=3, cur_headers=default_header):
    def wrapper(func):
        @functools.wraps(func)
        def deco(*args, **kwargs):
            for i in range(count):
                try:
                    data = func(*args, **kwargs, headers=cur_headers)
                    return data
                except Exception as e:
                    error_msg = traceback.format_exc()
                    logger.error(f" {i}   。{error_msg}")
            return None

        return deco

    return wrapper


class CommonRequest:
    """
    Common Request
    """

    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        }
        self.encoding = 'utf-8'
        self.retry_count = 3  #   3 

    def set_retry_count(self, count: int):
        """
              
        Args:
            count:

        Returns:

        """
        self.retry_count = count

    def set_headers(self, headers):
        """
             
        :param headers:
        :return:
        """
        self.headers = headers

    def set_encoding(self, encoding: str):
        self.encoding = encoding

    @retry(count=3)
    def post(self, quest_url: str, quest_data=None, quest_json=None, headers=None, timeout=10):
        if headers is not None:
            self.headers = headers
        res = requests.post(quest_url, quest_data, quest_json,
                            headers=self.headers, timeout=timeout)
        if res.status_code == 200:
            res.encoding = self.encoding
            res_response = res.content
            return True, res_response
        return False, f"res_status:{res.status_code}\nError_Reason:{res.content}"

    @retry(count=3)
    def get(self, quest_url: str, query_params=None, headers=None, timeout=10):
        if headers is not None:
            self.headers = headers
        res = requests.get(quest_url, query_params,
                           headers=self.headers, timeout=timeout)
        if res.status_code == 200:
            res.encoding = self.encoding
            res_response = res.content
            return True, res_response
        return False, f"res_status:{res.status_code}\nError_Reason:{res.content}"
