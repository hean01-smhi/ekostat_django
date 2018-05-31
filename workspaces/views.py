import json

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST

from accounts.decorators import require_account

from ekostat.api_calculator import get_calculator


@require_GET
@require_account
def index(request):
    user_id = request.account.get_user_id()
    ekos = get_calculator(user_id)
    return JsonResponse(ekos.request_workspace_list({'user_id': user_id}))

@require_POST
@require_account
def add(request):
    user_id = request.account.get_user_id()
    ekos = get_calculator(user_id)
    try:
        data = json.loads(request.body.decode('utf-8'))
        data['user_id'] = user_id
        return JsonResponse(ekos.request_workspace_add(data))
    except ValueError as e:
        return JsonResponse({"error_message": "Could not parse JSON."},status=400)
    except Exception as e:
        return JsonResponse({"error_message": "Could not add workspace."},status=400)

@require_POST
@require_account
def edit(request, workspace_uuid):
    user_id = request.account.get_user_id()
    ekos = get_calculator(user_id)
    try:
        data = json.loads(request.body.decode('utf-8'))
        data['uuid'] = workspace_uuid
        data['user_id'] = user_id
        return JsonResponse(ekos.request_workspace_edit(data))
    except ValueError as e:
        return JsonResponse({"error_message": "Could not parse JSON."},status=400)
    except Exception as e:
        return JsonResponse({"error_message": "Could not update workspace."},status=400)

@require_POST
@require_account
def delete(request, workspace_uuid):
    user_id = request.account.get_user_id()
    ekos = get_calculator(user_id)
    try:
        return JsonResponse(ekos.request_workspace_delete({'uuid': workspace_uuid}))
    except Exception as e:
        return JsonResponse({"error_message": "Could not delete workspace."},status=400)
