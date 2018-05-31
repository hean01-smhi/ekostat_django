from functools import wraps

from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.utils.encoding import smart_text
from django.utils.translation import gettext as _

from .models import Account, GuestAccount
from .tokens import json_web_token_generator, DecodeError, ExpiredSignatureError

UserModel = get_user_model()


def require_account(view_func):
    """
    Decorator for views that needs to access user account information.
    The 'account' property will always be added to the request and will either
    be an instance of `Account` or an instance of `GuestAccount`.
    In case of authentication failure an error response will be returned.

    If the request 'Authorization' header is present and provided with a
    JSON Web Token (in the format of 'Bearer <token>'), then this decorator
    tries to verify that token and retrieve user information from database.
    """
    @wraps(view_func)
    def _wrapped_view_func(request, *args, **kwargs):
        user = None
        if 'HTTP_AUTHORIZATION' in request.META:
            try:
                # TODO: Validate scheme
                scheme, token = smart_text(request.META['HTTP_AUTHORIZATION']).split()
                payload = json_web_token_generator.verify_token(token)
                user = UserModel.objects.get(pk=payload.get('_id'), is_active=True)
            except DecodeError:
                return JsonResponse({'errors': {
                    '__all__': [{
                        'code': 'invalid_token',
                        'message': _('Invalid token.'),
                    }]
                }}, status=400)
            except ExpiredSignatureError:
                return JsonResponse({'errors': {
                    '__all__': [{
                        'code': 'expired_signature',
                        'message': _('Signature has expired.'),
                    }]
                }}, status=400)
            except UserModel.DoesNotExist:
                return JsonResponse({'errors': {
                    '__all__': [{
                        'code': 'invalid_account',
                        'message': _('Account does not exist or has been disabled.'),
                    }]
                }}, status=400)
        request.account = Account(user) if user else GuestAccount()
        return view_func(request, *args, **kwargs)
    return _wrapped_view_func
