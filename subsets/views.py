import json

from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST

import os

from lib.ekostat_calculator.event_handler import EventHandler

root_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'lib', 'ekostat_calculator')
ekos = EventHandler(root_dir)

user_id = 1

@require_GET
def index(request, workspace_uuid):
	try:
		return JsonResponse(ekos.request_subset_list({"user_id": user_id, "workspace_uuid": workspace_uuid}))
	except Exception as e:
		return JsonResponse({"error_message": "Could not found data."},status=404)

@require_POST
def edit(request, workspace):
	if workspace != "my_workspace_1":
		return JsonResponse({"error_message": "Invalid workspace."},status=404)

	try:
		return JsonResponse(json.loads(request.body.decode('utf-8')))
	except ValueError as e:
		return JsonResponse({"error_message": "Could not parse JSON."},status=400)