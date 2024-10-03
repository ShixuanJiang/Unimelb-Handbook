import logging
import os
import datetime
from logging.handlers import RotatingFileHandler

from configs.basic import PROJECT_NAME

__all__ = {
    "logger"
}

# rename
LOG_FILE_PREFIX = PROJECT_NAME

PROJECT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
LOG_ROOT_DIR = f"{PROJECT_DIR}/logs"


def clear_logs(nums=100):
    """

    Args:
        nums (int, optional): _description_. Defaults to 100.
    """
    if os.path.exists(LOG_ROOT_DIR):
        for root, dirs, files in os.walk(LOG_ROOT_DIR):
            if len(files) > nums:
                for file in files:
                    os.remove(f"{root}/{file}")


def get_logger():
    clear_logs()
    time_stamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
    log_file = f"{LOG_ROOT_DIR}/{LOG_FILE_PREFIX}_{time_stamp}.log"
    logging.basicConfig(
        level=logging.INFO,
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    formatter = logging.Formatter(
        "[%(asctime)s] %(levelname)s "
        "[%(filename)s.%(funcName)s:%(lineno)d] %(message)s")
    root_logger = logging.getLogger()
    rotating_file_handler = RotatingFileHandler(
        log_file, 'a', 1024 * 1024 * 10, 10, "utf-8", True)
    root_logger.addHandler(rotating_file_handler)
    for handler in root_logger.handlers:
        handler.setFormatter(formatter)
    return logging.getLogger(LOG_FILE_PREFIX)


if not os.path.exists(LOG_ROOT_DIR):
    os.makedirs(LOG_ROOT_DIR)

logger = get_logger()

if __name__ == "__main__":
    logger.info("okk")
