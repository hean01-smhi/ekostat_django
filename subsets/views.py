import json

from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST

@require_GET
def index(request, workspace):
	if workspace != "my_workspace_1":
		return JsonResponse({"error_message": "Could not find workspace"},status=404)

	return JsonResponse({
		"workspace": {
			"alias": "My Workspace 1",
			"name": workspace,
		},
		"subsets": [
			{
				"active": True,
				"alias": "My Subset 1",
				"name": "my_subset_1",
				"water_districts": [
					{
						"label": "Bottenhavet",
						"value": "Bottenhavet",
						"selectable": True,
						"selected": True
					},
					{
						"label": "Skagerakk",
						"value": "Skagerakk",
						"selectable": True,
						"selected": False,
					}
				],
				"water_bodies": [
					{
						"label": "WB 1",
						"value": "WB 1",
						"selectable": True,
						"selected": True,
					},
					{
						"label": "WB 2",
						"value": "WB 2",
						"selectable": True,
						"selected": True,
					},
					{
						"label": "WB 3",
						"value": "WB 3",
						"selectable": True,
						"selected": False,
					},
					{
						"label": "WB 4",
						"value": "WB 4",
						"selectable": True,
						"selected": True,
					},
				],
				"periods": [
					{
						"label": "2006-2012",
						"value": "2006-2012",
						"selectable": True,
						"selected": True,
					},
					{
						"label": "2012-2017",
						"value": "2012-2017",
						"selectable": True,
						"selected": False,
					}
				],
				"quality_elements": [
					{
						"label": "Phytoplankton",
						"children": [
							{
								"label": "Chlorophyll - default",
								"value": "Chlorophyll - default",
								"selectable": True,
								"selected": True,
							},
							{
								"label": "Biovolume - default",
								"value": "Biovolume - default",
								"selectable": True,
								"selected": True,
							}
						]
					}
				],
				"supporting_elements": [
					{
						"label": "Secchi",
						"children": [
							{
								"label": "Secchi - default",
								"value": "Secchi - default",
								"selectable": True,
								"selected": False
							}
						]
					}
				]
			}
		]
	})

@require_POST
def edit(request, workspace):
	if workspace != "my_workspace_1":
		return JsonResponse({"error_message": "Invalid workspace."},status=404)

	try:
		return JsonResponse(json.loads(request.body.decode('utf-8')))
	except ValueError as e:
		return JsonResponse({"error_message": "Could not parse JSON."},status=400)