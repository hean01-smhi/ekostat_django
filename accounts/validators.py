import re

from django.core import validators
from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible
from django.utils.translation import gettext_lazy as _

@deconstructible
class UsernameValidator(validators.RegexValidator):
    regex = r'^[-a-zA-Z0-9_]+\Z'
    message = _(
        'Enter a valid username consisting of letters, '
        'numbers, underscores, or hyphens.'
    )
    message_disallowed = _(
        "Username '%(username)s' is not allowed."
    )
    disallowed = ['default', 'guest']

    def __call__(self, value):
        # Check if username is allowed
        if value.lower() in self.disallowed:
            raise ValidationError(
                self.message_disallowed,
                code=self.code,
                params={'username': value}
            )
        # Check if username match regex
        super().__call__(value)
