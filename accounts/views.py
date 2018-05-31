import json

from django.http import JsonResponse
from django.views import View
from django.utils.encoding import smart_text
from django.utils.translation import gettext as _

from .forms import TokenCreationForm, TokenRefreshForm


class AuthenticationView(View):
    form_class = TokenCreationForm

    def post(self, request):
        try:
            params = json.loads(smart_text(request.body))
        except ValueError:
            errors = {
                '__all__': [{
                    'code': 'invalid_data',
                    'message': _('Could not parse JSON.'),
                }]
            }
            return JsonResponse({'errors': errors}, status=400)

        form = self.form_class(params)

        if not form.is_valid():
            errors = form.errors.get_json_data()
            return JsonResponse({'errors': errors}, status=400)

        return JsonResponse({'token': form.get_token()})


class ReauthenticationView(AuthenticationView):
    form_class = TokenRefreshForm
