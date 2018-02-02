import json

from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST

@require_GET
def index(request):
	return JsonResponse({
		"workspaces": [
			{
				"label": "My Workspace 1",
				"value": "my_workspace_1",
			},
			{
				"label": "My Workspace 2",
				"value": "my_workspace_2",
			},
			{
				"label": "My Workspace 3",
				"value": "my_workspace_3",
			},
			{
				"label": "Default (shared)",
				"value": "default",
			}
		]
	})

@require_POST
def add(request):
	try:
		new_workspace = json.loads(request.body.decode('utf-8'))
		return JsonResponse({"workspaces": [new_workspace]})
	except ValueError as e:
		return JsonResponse({"error_message": "Could not parse JSON."},status=400)