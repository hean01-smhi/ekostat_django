from django import forms
from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import gettext as _

from .tokens import json_web_token_generator, DecodeError, ExpiredSignatureError

UserModel = get_user_model()


class TokenCreationForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField()

    error_messages = {
        'invalid_login': _('Please enter correct login credentials.'),
        'inactive_account': _('This account is not active.')
    }

    token_generator = json_web_token_generator

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.token = None

    def clean(self):
        cleaned_data = super().clean()

        username = cleaned_data.get('username')
        password = cleaned_data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if user is None:
                raise forms.ValidationError(
                    self.error_messages['invalid_login'],
                    code='invalid_login'
                )
            elif not user.is_active:
                raise forms.ValidationError(
                    self.error_messages['inactive_account'],
                    code='inactive_account'
                )
            else:
                self.token = self.token_generator.create_token(user)

        return cleaned_data


    def get_token(self):
        return self.token


class TokenRefreshForm(forms.Form):
    expiring_token = forms.CharField()

    error_messages = {
        'invalid_token': _('Invalid token.'),
        'expired_signature': _('Signature has expired.'),
        'invalid_account': _('Account does not exist or has been disabled.'),
    }

    token_generator = json_web_token_generator

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.token = None

    def clean(self):
        cleaned_data = super().clean()
        expiring_token = cleaned_data.get('expiring_token')

        if expiring_token:
            try:
                payload = self.token_generator.verify_token(expiring_token)
                user = UserModel.objects.get(
                    pk=payload.get('_id'),
                    is_active=True
                )
                self.token = self.token_generator.create_token(user)
            except DecodeError:
                raise forms.ValidationError(
                    self.error_messages['invalid_token'],
                    code='invalid_token'
                )
            except ExpiredSignatureError:
                raise forms.ValidationError(
                    self.error_messages['expired_signature'],
                    code='expired_signature'
                )
            except UserModel.DoesNotExist:
                raise forms.ValidationError(
                    self.error_messages['invalid_account'],
                    code='invalid_account'
                )

        return cleaned_data


    def get_token(self):
        return self.token

