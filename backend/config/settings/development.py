import os
from urllib.parse import urlparse
from .base import *

SECRET_KEY = '0123456789abcdef'
DEBUG = True

if os.getenv('BACKEND_URL'):
    o = urlparse(os.getenv('BACKEND_URL'))
    ALLOWED_HOSTS = [o.netloc]
else:
    ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3'
    }
}

MEDIA_ROOT = BASE_DIR / 'uploads'
MEDIA_URL = 'uploads/'
