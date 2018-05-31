import json

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST

from accounts.decorators import require_account

from lib.ekostat_calculator.event_handler import EventHandler


ekos = EventHandler(settings.EKOSTAT_CALCULATOR_ROOT_DIR)

@require_GET
@require_account
def index(request, workspace_uuid):
    try:
        user_id = request.account.get_user_id()
        return JsonResponse(ekos.request_subset_list({"user_id": user_id, "workspace_uuid": workspace_uuid}))
    except Exception as e:
        return JsonResponse({"error_message": "Could not found data."},status=404)

@require_GET
def info(request, subset_uuid):
    try:
        # Does not work yet
        #return JsonResponse(ekos.request_subset_info(subset_uuid))
        return JsonResponse({"subset_uuid": subset_uuid})
    except Exception as e:
        return JsonResponse({"error_message": "Could not found data."},status=404)

@require_POST
def add(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        data['user_id'] = user_id
        # Does not wotk yet
        #return JsonResponse(ekos.request_subset_add(data))
        return JsonResponse(data)
    except ValueError as e:
        return JsonResponse({"error_message": "Could not parse JSON."},status=400)
    except Exception as e:
        return JsonResponse({"error_message": "Could not add subset."},status=400)


@require_POST
def delete(request, subset_uuid):
    try:
        data = json.loads(request.body.decode('utf-8'))
        data['subset_uuid'] = subset_uuid
        data['user_id'] = user_id
        # Does not work yest
        #return JsonResponse(ekos.request_subset_delete(data))
        return JsonResponse(data)
    except ValueError as e:
        return JsonResponse({"error_message": "Could not parse JSON."},status=400)
    except Exception as e:
        return JsonResponse({"error_message": "Could not delete subset."},status=400)

@require_POST
def edit(request, subset_uuid):
    try:
        data = json.loads(request.body.decode('utf-8'))
        data['subset_uuid'] = subset_uuid
        data['user_id'] = user_id
        # Does not work yet
        #return JsonResponse(ekos.request_subset_edit(data))
        return JsonResponse(data)
    except ValueError as e:
        return JsonResponse({"error_message": "Could not parse JSON."},status=400)
    except Exception as e:
        return JsonResponse({"error_message": "Could not edit subset."},status=400)
