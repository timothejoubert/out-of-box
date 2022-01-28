from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'quhf_ci-1fzizn+er61o7y3zwvr(++vz=bv-v=+3o+*kd0qa)('

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ['*', '192.168.1.13','192.168.1.10'] 


EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

try:
    from .local import *
except ImportError:
    pass
