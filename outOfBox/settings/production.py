from .base import *

DEBUG = False

ALLOWED_HOSTS = ['outofbox.screen-club.com', ]


try:
    from .local import *
except ImportError:
    pass
