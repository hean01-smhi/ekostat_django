import re

from django.core import validators
from django.utils.deconstruct import deconstructible
from django.utils.translation import gettext_lazy as _

@deconstructible
class UsernameValidator(validators.RegexValidator):
    regex = r'^[-a-zA-Z0-9_]+\Z'
    message = _(
        'Enter a valid username consisting of letters, '
        'numbers, underscores, or hyphens.'
    )
