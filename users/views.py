from django.conf import settings
from django.contrib.auth import authenticate
from django.views.decorators.http import require_POST
from django.http import JsonResponse
import json
import jwt

@require_POST
def auth(request):
    try:
        credentials = json.loads(request.body.decode('utf-8'))
    except ValueError:
        return JsonResponse({"error_message": "Could not parse JSON."},status=400)

    user = authenticate(**credentials)

    if user is None or not user.is_active:
        return JsonResponse({"error_message": "Invalid login."},status=400)

    payload = {
        'id': user.pk,
        'email': user.email,
        'username': user.username
    }

    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256').decode('utf-8')

    return JsonResponse({'token': token})
