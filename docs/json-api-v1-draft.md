# JSON API v1 (early draft)

## Workspaces

Request:
```
GET /api/workspaces/
```

Response:
```
{
	"workspaces": [
		{
			"label": "My Workspace",
			"value": "my_workspace"
		}
	]
}
```

Request:
```
POST /api/workspaces/add

{"label": "My New Workspace"}
```

Response:
```
{
	"workspaces": [
		{
			"label": "My New Workspace",
			"value": "my_new_workspace"
		},
		{
			"label": "My Workspace",
			"value": "my_workspace"
		}
	]
}

```

## Subsets

Request:
```
GET /api/subsets/my_workspace
```

Response:
```
{
	"workspace": {
		"alias": "My Workspace",
		"name": "my_workspace"
	},
	"subsets": [
		{
			"alias": "My Subset 1",
			"name": "my_subset_1",
			"active": true,
			"periods": [
				{
					"label": "2006-2012",
					"selectable": true,
					"selected": true,
					"value": "2006-2012"
				},
				{
					"label": "2012-2017",
					"selectable": true,
					"selected": false,
					"value": "2012-2017"
				}
			],
			"water_bodies": [
				{
					"label": "WB 1",
					"selectable": true,
					"selected": true,
					"value": "WB 1"
				},
				{
					"label": "WB 2",
					"selectable": true,
					"selected": true,
					"value": "WB 2"
				},
				{
					"label": "WB 3",
					"selectable": true,
					"selected": false,
					"value": "WB 3"
				},
				{
					"label": "WB 4",
					"selectable": true,
					"selected": true,
					"value": "WB 4"
				}
			],
			"water_districts": [
				{
					"label": "Bottenhavet",
					"selectable": true,
					"selected": true,
					"value": "Bottenhavet"
				},
				{
					"label": "Skagerakk",
					"selectable": true,
					"selected": false,
					"value": "Skagerakk"
				}
			],
			"supporting_elements": [
				{
					"label": "Secchi",
					"children": [
						{
							"label": "Secchi - default",
							"selectable": true,
							"selected": false,
							"value": "Secchi - default"
						}
					]
				}
			],
			"quality_elements": [
				{
					"label": "Phytoplankton",
					"children": [
						{
							"label": "Chlorophyll - default",
							"selectable": true,
							"selected": true,
							"value": "Chlorophyll - default"
						},
						{
							"label": "Biovolume - default",
							"selectable": true,
							"selected": true,
							"value": "Biovolume - default"
						}
					]
				}
			]
		}
	]
}
```

Request:
```
POST /api/subsets/my_workspace/edit

{
	"workspace": {
		"alias": "My Workspace",
		"name": "my_workspace"
	},
	"subsets": [
		{
			"alias": "My New Subset",
			"name": "my_new_subset",
			"active": true,
			"periods": [],
			"water_bodies": [],
			"water_districts": [],
			"supporting_elements": [],
			"quality_elements": []
		},
		{
			"alias": "My Subset 1",
			"name": "my_subset_1",
			"active": true,
			"periods": [],
			"water_bodies": [],
			"water_districts": [],
			"supporting_elements": [],
			"quality_elements": []
		}
	]
}

```

Response:
```
{
	"workspace": {
		"alias": "My Workspace",
		"name": "my_workspace"
	},
	"subsets": [
		{
			"alias": "My New Subset",
			"name": "my_new_subset",
			"active": true,
			"periods": [],
			"water_bodies": [],
			"water_districts": [],
			"supporting_elements": [],
			"quality_elements": []
		},
		{
			"alias": "My Subset 1",
			"name": "my_subset_1",
			"active": true,
			"periods": [],
			"water_bodies": [],
			"water_districts": [],
			"supporting_elements": [],
			"quality_elements": []
		}
	]
}
```


## Reports

Request:
```
GET /api/reports/my_workspace
```

Response:
```
{
	"datasets": []
}
```

Request:
```
GET /api/reports/my_workspace/my_subset
```

Response:
```
{
	"datasets": []
}
```
