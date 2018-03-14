import json

from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST

import os

from lib.ekostat_calculator.event_handler import EventHandler

root_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'lib', 'ekostat_calculator')
ekos = EventHandler(root_dir)

user_id = 1

@require_GET
def index(request):
	return JsonResponse(ekos.request_workspace_list({'user_id': user_id}))

@require_POST
def add(request):
	try:
		#data = {'alias': 'test_workspace', 'source': 'default_workspace'}
		data = json.loads(request.body.decode('utf-8'))
		data['user_id'] = user_id
		return JsonResponse(ekos.request_workspace_add(data))
	except ValueError as e:
		return JsonResponse({"error_message": "Could not parse JSON."},status=400)
	except Exception as e:
		return JsonResponse({"error_message": "Could not add workspace."},status=400)

@require_POST
def edit(request, workspace_uuid):
	try:
		#data = {'alias': 'test_workspace_1_renamed'}
		data = json.loads(request.body.decode('utf-8'))
		data['uuid'] = workspace_uuid
		return JsonResponse(ekos.request_workspace_edit(data))
	except ValueError as e:
		return JsonResponse({"error_message": "Could not parse JSON."},status=400)
	except Exception as e:
		return JsonResponse({"error_message": "Could not update workspace."},status=400)

@require_POST
def delete(request, workspace_uuid):
	try:
		return JsonResponse(ekos.request_workspace_delete({'uuid': workspace_uuid}))
	except Exception as e:
		return JsonResponse({"error_message": "Could not delete workspace."},status=400)