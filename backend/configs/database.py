import os
from pathlib import Path

from utils.utils import is_apple_system

__all__ = {
    'LOCAL_DATABASE',
    'MAIN_DATABASE'
}

base_folder = Path(__file__).resolve().parent.parent


LOCAL_DATABASE = {
    'ENGINE': 'django.db.backends.sqlite3',
    'NAME': os.path.join(base_folder, 'db.sqlite3'),
}


MAIN_DATABASE = LOCAL_DATABASE
