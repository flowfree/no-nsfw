import os
from urllib.parse import urlparse
from .base import *

SECRET_KEY = os.getenv('SECRET_KEY')
DEBUG = False

# Warning: you need to set the hostname of the backend app
# or it will allow every hostname
if os.getenv('BACKEND_URL'):
    o = urlparse(os.getenv('BACKEND_URL'))
    ALLOWED_HOSTS = [o.netloc]
elif os.getenv('BACKEND_HOSTNAME'):
    ALLOWED_HOSTS = [os.getenv('BACKEND_HOSTNAME')]
elif os.getenv('API_HOSTNAME'):
    ALLOWED_HOSTS = [os.getenv('API_HOSTNAME')]
else:
    ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT'),
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD')
    }
}

# Disable DRF's browsable API
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    )
}

CORS_ALLOWED_ORIGINS = [
    'http://' + os.getenv('FRONTEND_HOSTNAME'),
    'https://' + os.getenv('FRONTEND_HOSTNAME'),
]

