import json

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST

from accounts.decorators import require_account

from lib.ekostat_calculator.event_handler import EventHandler


ekos = EventHandler(settings.EKOSTAT_CALCULATOR_ROOT_DIR)



@require_GET
@require_account
def index(request):
    user_id = request.account.get_user_id()
    return JsonResponse(ekos.request_workspace_list({'user_id': user_id}))

@require_POST
@require_account
def add(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        data['user_id'] = request.account.get_user_id()
        return JsonResponse(ekos.request_workspace_add(data))
    except ValueError as e:
        return JsonResponse({"error_message": "Could not parse JSON."},status=400)
    except Exception as e:
        return JsonResponse({"error_message": "Could not add workspace."},status=400)

@require_POST
@require_account
def edit(request, workspace_uuid):
    try:
        data = json.loads(request.body.decode('utf-8'))
        data['uuid'] = workspace_uuid
        data['user_id'] = request.account.get_user_id()
        return JsonResponse(ekos.request_workspace_edit(data))
    except ValueError as e:
        return JsonResponse({"error_message": "Could not parse JSON."},status=400)
    except Exception as e:
        return JsonResponse({"error_message": "Could not update workspace."},status=400)

@require_POST
@require_account
def delete(request, workspace_uuid):
    try:
        return JsonResponse(ekos.request_workspace_delete({'uuid': workspace_uuid}))
    except Exception as e:
        return JsonResponse({"error_message": "Could not delete workspace."},status=400)
