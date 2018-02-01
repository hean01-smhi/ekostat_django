from django.http import JsonResponse

# Create your views here.
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