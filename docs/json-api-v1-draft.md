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
			"alias": "My Workspace",
			"uid": "my_workspace",
			"status": "editable"
		}
	]
}
```

Request:
```
POST /api/workspaces/add

{"alias": "My New Workspace", "source": "uuid"}
```

Response:
```
{
	"alias": "My Workspace",
	"uid": "my_workspace",
	"status": "editable"
}
```

Request:
```
POST /api/workspaces/edit/<workspace_uid>

{"alias": "New Name", "uuid": "..."}
```

Response:
```
{
	"alias": "New Name",
	"uid": "..."
}
```

Request:
```
POST /api/workspaces/delete/<workspace_uid>

{"uid": "..."}
```

Response:
```
{
	"alias": "My Workspace",
	"uid": "..."
}
```

## Subsets

Request:
```
GET /api/subsets/<workspace_uid>
```

Response:
```
{
	"workspace": {
		"alias": "My Workspace",
		"uid": "...",
		"status": "editable"
	},
	"subsets": [
		{
			"alias": "My Subset 1",
			"uuid": "...",
			"active": true,
			"periods": [
				{
					"label": "2006-2012",
					"status": "selectable",
					"selected": true,
					"value": "2006-2012"
				},
				{
					"label": "2012-2017",
					"status": "selectable",
					"selected": false,
					"value": "2012-2017"
				}
			],
			"water_bodies": [
				{
					"label": "WB 1",
					"status": "selectable",
					"selected": true,
					"value": "WB 1"
				},
				{
					"label": "WB 2",
					"status": "selectable",
					"selected": true,
					"value": "WB 2"
				},
				{
					"label": "WB 3",
					"status": "selectable",
					"selected": false,
					"value": "WB 3"
				},
				{
					"label": "WB 4",
					"status": "selectable",
					"selected": true,
					"value": "WB 4"
				}
			],
			"water_districts": [
				{
					"label": "Bottenhavet",
					"status": "selectable",
					"selected": true,
					"value": "Bottenhavet"
				},
				{
					"label": "Skagerakk",
					"status": "selectable",
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
							"status": "selectable",
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
							"status": "selectable",
							"selected": true,
							"value": "Chlorophyll - default"
						},
						{
							"label": "Biovolume - default",
							"status": "selectable",
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
POST /api/subsets/<workspace_uid>/create

{"alias": "New subset", source: "..."}
```

Response:
```
{
	"alias": "My Subset 1",
	"uuid": "...",
	"active": true,
	"periods": [
		{
			"label": "2006-2012",
			"status": "selectable",
			"selected": true,
			"value": "2006-2012"
		},
		{
			"label": "2012-2017",
			"status": "selectable",
			"selected": false,
			"value": "2012-2017"
		}
	],
	"water_bodies": [
		{
			"label": "WB 1",
			"status": "selectable",
			"selected": true,
			"value": "WB 1"
		},
		{
			"label": "WB 2",
			"status": "selectable",
			"selected": true,
			"value": "WB 2"
		},
		{
			"label": "WB 3",
			"status": "selectable",
			"selected": false,
			"value": "WB 3"
		},
		{
			"label": "WB 4",
			"status": "selectable",
			"selected": true,
			"value": "WB 4"
		}
	],
	"water_districts": [
		{
			"label": "Bottenhavet",
			"status": "selectable",
			"selected": true,
			"value": "Bottenhavet"
		},
		{
			"label": "Skagerakk",
			"status": "selectable",
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
					"status": "selectable",
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
					"status": "selectable",
					"selected": true,
					"value": "Chlorophyll - default"
				},
				{
					"label": "Biovolume - default",
					"status": "selectable",
					"selected": true,
					"value": "Biovolume - default"
				}
			]
		}
	]
}
```



Request:
```
POST /api/subsets/edit/<subset_uid>
{
	"alias": "My Subset 1",
	"uuid": "...",
	"active": true,
	"periods": [
		{
			"label": "2006-2012",
			"status": "selectable",
			"selected": true,
			"value": "2006-2012"
		},
		{
			"label": "2012-2017",
			"status": "selectable",
			"selected": false,
			"value": "2012-2017"
		}
	],
	"water_bodies": [
		{
			"label": "WB 1",
			"status": "selectable",
			"selected": true,
			"value": "WB 1"
		},
		{
			"label": "WB 2",
			"status": "selectable",
			"selected": true,
			"value": "WB 2"
		},
		{
			"label": "WB 3",
			"status": "selectable",
			"selected": false,
			"value": "WB 3"
		},
		{
			"label": "WB 4",
			"status": "selectable",
			"selected": true,
			"value": "WB 4"
		}
	],
	"water_districts": [
		{
			"label": "Bottenhavet",
			"status": "selectable",
			"selected": true,
			"value": "Bottenhavet"
		},
		{
			"label": "Skagerakk",
			"status": "selectable",
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
					"status": "selectable",
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
					"status": "selectable",
					"selected": true,
					"value": "Chlorophyll - default"
				},
				{
					"label": "Biovolume - default",
					"status": "selectable",
					"selected": true,
					"value": "Biovolume - default"
				}
			]
		}
	]
}

```

Response:
```
{
	"alias": "My Subset 1",
	"uuid": "...",
	"active": true,
	"periods": [
		{
			"label": "2006-2012",
			"status": "selectable",
			"selected": true,
			"value": "2006-2012"
		},
		{
			"label": "2012-2017",
			"status": "selectable",
			"selected": false,
			"value": "2012-2017"
		}
	],
	"water_bodies": [
		{
			"label": "WB 1",
			"status": "selectable",
			"selected": true,
			"value": "WB 1"
		},
		{
			"label": "WB 2",
			"status": "selectable",
			"selected": true,
			"value": "WB 2"
		},
		{
			"label": "WB 3",
			"status": "selectable",
			"selected": false,
			"value": "WB 3"
		},
		{
			"label": "WB 4",
			"status": "selectable",
			"selected": true,
			"value": "WB 4"
		}
	],
	"water_districts": [
		{
			"label": "Bottenhavet",
			"status": "selectable",
			"selected": true,
			"value": "Bottenhavet"
		},
		{
			"label": "Skagerakk",
			"status": "selectable",
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
					"status": "selectable",
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
					"status": "selectable",
					"selected": true,
					"value": "Chlorophyll - default"
				},
				{
					"label": "Biovolume - default",
					"status": "selectable",
					"selected": true,
					"value": "Biovolume - default"
				}
			]
		}
	]
}
```

Request:
```
POST /api/subsets/delete/<subset_uid>

{"uid": "...", ...}
```

Response:
```
{
	"uid": "...",
	...
}
```


## Reports

Request:
```
GET /api/reports/<workspace_uid>
```

Response:
```
{
	"datasets": []
}
```

Request:
```
GET /api/reports/<workspace_uid>/<subset_uid>
```

Response:
```
{
	"datasets": []
}
```
