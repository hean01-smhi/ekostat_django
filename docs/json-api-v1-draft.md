# JSON API v1 (draft)

```
                             ________
                            |        |
                            |        |
                            |        |
                            |        |
                            |        |
                ________    |        |
               |        |   |        |
               |        |   |        |
               |        |   |        |
   ________    |        |   |        |
  |        |   |        |   |        |
  |        |   |        |   |        |
  |        |   |        |   |        |
  |        |   |        |   |        |
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```


This document describes the API that Django exposes to enable client applications to interact with the core calculator library.


## Introduction

Communcation is over HTTP and data is transfered as JSON.

Parameters for `GET` requests should be specified in the query string of the URL, and parameters for `PATCH`, `POST`, `PUT` and `DELETE` requests should be encoded as JSON in the request body.


## Overview

The table shown below is an overview of available API calls with corresponding info on how it should be used in a HTTP context, and also how it maps to the core calculator library. The API calls are explained in further details later in this document.

Description | Verb | Path | Core reference
----------- | ---- | ---- | -------------------
[List workspaces](#list-workspaces) | `GET` | `/api/v1/workspaces/` | [`request_workspace_list`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_workspace_list%22)
[Create a workspace](#create-a-workspace) | `POST` | `/api/v1/workspaces/` | [`request_workspace_add`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_workspace_add%22)
[Edit a workspace](#edit-a-workspace) | `PATCH` | `/api/v1/workspaces/<workspace_uuid>/` | [`request_workspace_edit`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_workspace_edit%22)
[Delete a workspace](#delete-a-workspace) | `DELETE` | `/api/v1/workspaces/<workspace_uuid>/`| [`request_workspace_delete`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_workspace_delete%22)
[List data sources](#list-data-sources) | `GET` | `/api/v1/workspaces/<workspace_uuid>/sources/` | [`request_workspace_data_sources_list`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_workspace_data_sources_list%22)
[Edit data sources](#edit-data-sources) | `PATCH` | `/api/v1/workspaces/<workspace_uuid>/sources/` | [`request_workspace_data_sources_edit`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_workspace_data_sources_edit%22)
[Load default data](#load-default-data) | `POST` | `/api/v1/workspaces/<workspace_uuid>/default_data/` | [`request_workspace_load_default_data`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_workspace_load_default_data%22)
[List subsets](#list-subsets) | `GET` | `/api/v1/workspaces/<workspace_uuid>/subsets/` | [`request_subset_list`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_subset_list%22)
[Create a subset](#create-a-subset) | `POST` | `/api/v1/workspaces/<workspace_uuid>/subsets/` | [`request_subset_add`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_subset_add%22)
[Edit a subset](#edit-a-subset) | `PATCH` | `/api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/` | [`request_subset_edit`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_subset_edit%22)
[Delete a subset](#delete-a-subset) | `DELETE` | `/api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/` | [`request_subset_delete`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_subset_delete%22)
[List data filters](#list-data-filters) | `GET` | `/api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/filters/` | [`request_subset_get_data_filter`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_subset_get_data_filter%22)
[Create indicators](#create-indicators) | `POST` | `/api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/indicators/` | [`request_subset_get_indicator_settings`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_subset_get_indicator_settings%22)
[Edit indicators](#edit-indicators) | `PATCH` | `/api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/indicators/` | [`request_subset_set_indicator_settings`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_subset_set_indicator_settings%22)


## Authentication

Use the `Authorization` header provided with a JSON Web Token in requests that requires authentication:

```
Authorization: Bearer <json_web_token>
```

For example (using curl):

```
curl -H "Authorization: Bearer <json_web_token>" http://127.0.0.1:8000/api/v1/workspaces
```

### Obtaining a token

Obtaining a JSON Web Token requires user credentials.

```
POST /api/v1/authenticate/
```

#### Parameters

Name | Type | Description
---- | ---- | -----------
`username` | `string` | The user email adress.
`password` | `string` | The user password.

##### Example

```
{
  "username": "demo@vattenstatus.se",
  "password": "my-s3cr3t3-p4ssw0rd"
}
```

#### Response

```
Status code: 200 OK

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzAxMzE0MDQsIl9pZCI6MywiZXhwIjoxNTMwNzM2MjA0LCJlbWFpbCI6ImRlbW9AdmF0dGVuc3RhdHVzLnNlIn0.1FsKSR6B_36awbgeWUEAme6XNS87x4TwGAHeaT9QGvA"
}
```

### Renew a token

Renewal of a JSON Web Token requires an existing JSON Web Token that has not already been expired. If given token is valid, a new token with longer expiration time will be returned.

```
POST /api/v1/reauthenticate/
```

#### Parameters

Name | Type | Description
---- | ---- | -----------
`expiring_token` | `string` | The token that needs to be renewed.

##### Example

```
{
  "expiring_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzAxMzE0MDQsIl9pZCI6MywiZXhwIjoxNTMwNzM2MjA0LCJlbWFpbCI6ImRlbW9AdmF0dGVuc3RhdHVzLnNlIn0.1FsKSR6B_36awbgeWUEAme6XNS87x4TwGAHeaT9QGvA"
}
```

#### Response

```
Status code: 200 OK

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzAxMzgyMDcsImV4cCI6MTUzMDc0MzAwNywiZW1haWwiOiJkZW1vQHZhdHRlbnN0YXR1cy5zZSIsIl9pZCI6M30.5Krd0Gp2haDrL8r3PVzhGfyV8_L3HJlFkS1yAtU1H6o"
}
```

## Errors

### Client errors

TODO

### Server errors

In case the calculator for an authenticated user is already busy, working on a previous request, the server responds with the status `503 Service Unavailable` combined with the `Retry-After` header to indicate how long the client should wait before making a new request.


## List workspaces

List workspaces that belongs to the authenticated user. If the user is not authenticated, then list public readonly workspaces.

```
GET /api/v1/workspaces/
```

### Response

```
Status code: 200 OK

{
  "workspaces": [
    {
      "workspace_uuid": "default_workspace",
      "status": "readable",
      "alias": "default_workspace"
    },
    {
      "workspace_uuid": "2e88c176-504a-4823-983b-c9f1cfee00e0",
      "status": "editable",
      "alias": "My Workspace"
    }
  ]
}
```


## Create a workspace

Creating a workspace requires the user to be authenticated.

```
POST /api/v1/workspaces/
```

### Parameters

Name | Type | Description
---- | ---- | -----------
`alias` | `string` | Alias name for the new workspace.
`workspace_uuid` | `string` | UUID of the workspace to be used as source for the new workspace.

#### Example

```
{
  "alias": "My Workspace",
  "workspace_uuid": "default_workspace"
}
```

### Response

```
Status code: 201 Created

{
  "workspace_uuid": "2e88c176-504a-4823-983b-c9f1cfee00e0",
  "status": "editable",
  "alias": "My Workspace"
}
```


## Edit a workspace

Editing a workspace requires the user to be authenticated, and also to be the owner of the workspace.

```
PATCH /api/v1/workspaces/<workspace_uuid>/
```

### Parameters

Name | Type | Description
---- | ---- | -----------
`alias` | `string` | Alias name for the workspace.

#### Example

```
{
  "alias": "My Renamed Workspace"
}
```

### Response

```
Status code: 200 OK

{
  "workspace_uuid": "2e88c176-504a-4823-983b-c9f1cfee00e0",
  "status": "editable",
  "alias": "My Renamed Workspace"
}
```


## Delete a workspace

Deleting a workspace requires the user to be authenticated, and also to be the owner of the workspace.


```
DELETE /api/v1/workspaces/<workspace_uuid>/
```

### Response

```
Status code: 204 No Content
```


## List data sources

List data sources available for given workspace. If the workspace is private, then the user must be authenticated and owner of the workspace.

```
GET /api/v1/workspaces/<workspace_uuid>/sources/
```

### Response

```
Status code: 200 OK

{
  "data_sources": [
    {
      "filename": "physicalchemicalmodel_110001_PROFILER_alldepths_SE652400-223501_toolbox.dat",
      "loaded": false,
      "status": false,
      "datatype": "physicalchemicalmodel"
    },
    {
      "filename": "physicalchemicalmodel_120004_PROFILER_alldepths_SE612520-172080_toolbox.dat",
      "loaded": false,
      "status": false,
      "datatype": "physicalchemicalmodel"
    },
    {
      "filename": "zoobenthos_2016_row_format_2.txt",
      "loaded": false,
      "status": false,
      "datatype": "zoobenthos"
    },
    {
      "filename": "phytoplankton_2016_row_format.txt",
      "loaded": false,
      "status": false,
      "datatype": "phytoplankton"
    },
    {
      "filename": "chlorophyll_sharkweb_data_chlorophyll_wb_2007-2017_20180320.txt",
      "loaded": false,
      "status": false,
      "datatype": "chlorophyll"
    },
    {
      "filename": "phytoplankton_sharkweb_data_biovolume_wb_2013-2017_20180320.txt",
      "loaded": false,
      "status": false,
      "datatype": "phytoplankton"
    },
    {
      "filename": "physicalchemical_sharkweb_data_fyskem_wb_2007-2017_20180320.txt",
      "loaded": false,
      "status": false,
      "datatype": "physicalchemical"
    },
    {
      "filename": "zoobenthos_sharkweb_data_BQIm_wb_2007-2017_20180320.txt",
      "loaded": false,
      "status": false,
      "datatype": "zoobenthos"
    },
    {
      "filename": "chlorophyll_integrated_2015_2016_row_format.txt",
      "loaded": false,
      "status": false,
      "datatype": "chlorophyll"
    },
    {
      "filename": "phytoplankton_sharkweb_data_biovolume_wb_2007-2012_20180320.txt",
      "loaded": false,
      "status": false,
      "datatype": "phytoplankton"
    }
  ],
  "workspace_uuid": "2e88c176-504a-4823-983b-c9f1cfee00e0"
}
```


## Edit data sources

Editing data sources for a given workspace requires the user to be authenticated, and also to be the owner of the workspace.

```
PATCH /api/v1/workspaces/<workspace_uuid>/sources/
```

### Parameters

Name | Type | Description
---- | ---- | -----------
`data_sources` | `array` | An array of data source objects.

Each data source object in the `data_sources` array must follow the structure described below:

Name | Type | Description
---- | ---- | -----------
`filename` | `string` | Filename for the data source.
`loaded` | `boolean` | Indicates wether the data source is loaded or not.
`status` | `boolean` | ?
`datatype` | `string` | Type for the data source.

#### Example

```
{
  "data_sources": [
    {
      "filename": "physicalchemicalmodel_110001_PROFILER_alldepths_SE652400-223501_toolbox.dat",
      "loaded": true,
      "status": false,
      "datatype": "physicalchemicalmodel"
    },
    {
      "filename": "physicalchemicalmodel_120004_PROFILER_alldepths_SE612520-172080_toolbox.dat",
      "loaded": true,
      "status": false,
      "datatype": "physicalchemicalmodel"
    },
    {
      "filename": "zoobenthos_2016_row_format_2.txt",
      "loaded": false,
      "status": false,
      "datatype": "zoobenthos"
    },
    {
      "filename": "phytoplankton_2016_row_format.txt",
      "loaded": false,
      "status": false,
      "datatype": "phytoplankton"
    },
    {
      "filename": "chlorophyll_sharkweb_data_chlorophyll_wb_2007-2017_20180320.txt",
      "loaded": false,
      "status": false,
      "datatype": "chlorophyll"
    },
    {
      "filename": "phytoplankton_sharkweb_data_biovolume_wb_2013-2017_20180320.txt",
      "loaded": false,
      "status": false,
      "datatype": "phytoplankton"
    },
    {
      "filename": "physicalchemical_sharkweb_data_fyskem_wb_2007-2017_20180320.txt",
      "loaded": false,
      "status": false,
      "datatype": "physicalchemical"
    },
    {
      "filename": "zoobenthos_sharkweb_data_BQIm_wb_2007-2017_20180320.txt",
      "loaded": false,
      "status": false,
      "datatype": "zoobenthos"
    },
    {
      "filename": "chlorophyll_integrated_2015_2016_row_format.txt",
      "loaded": false,
      "status": false,
      "datatype": "chlorophyll"
    },
    {
      "filename": "phytoplankton_sharkweb_data_biovolume_wb_2007-2012_20180320.txt",
      "loaded": false,
      "status": false,
      "datatype": "phytoplankton"
    }
  ]
}
```

### Response

```
Status code: 200 OK

{
  "data_sources": [
    {
      "filename": "physicalchemicalmodel_110001_PROFILER_alldepths_SE652400-223501_toolbox.dat",
      "loaded": true,
      "status": false,
      "datatype": "physicalchemicalmodel"
    },
    {
      "filename": "physicalchemicalmodel_120004_PROFILER_alldepths_SE612520-172080_toolbox.dat",
      "loaded": true,
      "status": false,
      "datatype": "physicalchemicalmodel"
    },
    {
      "filename": "zoobenthos_2016_row_format_2.txt",
      "loaded": false,
      "status": false,
      "datatype": "zoobenthos"
    },
    {
      "filename": "phytoplankton_2016_row_format.txt",
      "loaded": false,
      "status": false,
      "datatype": "phytoplankton"
    },
    {
      "filename": "chlorophyll_sharkweb_data_chlorophyll_wb_2007-2017_20180320.txt",
      "loaded": false,
      "status": false,
      "datatype": "chlorophyll"
    },
    {
      "filename": "phytoplankton_sharkweb_data_biovolume_wb_2013-2017_20180320.txt",
      "loaded": false,
      "status": false,
      "datatype": "phytoplankton"
    },
    {
      "filename": "physicalchemical_sharkweb_data_fyskem_wb_2007-2017_20180320.txt",
      "loaded": false,
      "status": false,
      "datatype": "physicalchemical"
    },
    {
      "filename": "zoobenthos_sharkweb_data_BQIm_wb_2007-2017_20180320.txt",
      "loaded": false,
      "status": false,
      "datatype": "zoobenthos"
    },
    {
      "filename": "chlorophyll_integrated_2015_2016_row_format.txt",
      "loaded": false,
      "status": false,
      "datatype": "chlorophyll"
    },
    {
      "filename": "phytoplankton_sharkweb_data_biovolume_wb_2007-2012_20180320.txt",
      "loaded": false,
      "status": false,
      "datatype": "phytoplankton"
    }
  ]
}
```


## Load default data

Loading default data for a workspace requires the user to authenticated, and to be the owner of given workspace.

```
POST /api/v1/workspaces/<workspace_uuid>/default_data/
```

### Response

```
Status code: 200 OK

?
```


## List subsets

List subsets for a given workspace. If the workspace is private, then the user must be authenticated and owner of the workspace.

```
GET /api/v1/workspaces/<workspace_uuid>/subsets/
```

### Response

```
Status code: 200 OK

{
  "subsets": [
    {
      "alias": "default_subset",
      "status": "readable",
      "active": false,
      "subset_uuid": "default_subset"
    },
    {
      "alias": "My Subset",
      "status": "editable",
      "active": true,
      "subset_uuid": "f86b420d-f285-47dd-ae5a-a52ea6bbdf93"
    }
  ],
  "workspace": {
    "workspace_uuid": "2e88c176-504a-4823-983b-c9f1cfee00e0",
    "alias": "New WS",
    "status": "deleted"
  }
}
```


## Create a subset

Creating a subset in a given workspace requires the user to be authenticated, and also to be the owner of the worskpace.

```
POST /api/v1/workspaces/<workspace_uuid>/subsets/
```

### Parameters

Name | Type | Description
---- | ---- | -----------
`alias` | `string` | Alias name for the new subset.
`subset_uuid` | `string` | UUID for the subset to be used as source for the new subset.

#### Example

```
{
  "alias": "My Subset",
  "subset_uuid": "default_subset"
}
```

### Response

```
Status code: 201 Created

{
  "alias": "My Subset",
  "status": "editable",
  "active": true,
  "subset_uuid": "a2115009-55ea-49ef-8c1e-50872de3a87e"
}
```


## Edit a subset

Editing a subset requires the user to be authenticated, and to be the owner of given workspace and subset.

```
PATCH /api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/
```

### Parameters

Name | Type | Description
---- | ---- | -----------
`alias` | `string` | Alias name for the subset.

#### Example

```
{
  "alias": "My Renamed Subset"
}
```

### Response

```
Status code: 200 OK

{
  "alias": "My Renamed Subset",
  "status": "editable",
  "active": true,
  "subset_uuid": "a2115009-55ea-49ef-8c1e-50872de3a87e"
}
```


## Delete a subset

Deleting a subset requires the user to be authenticated, and to be the owner of given workspace and subset.

```
DELETE /api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/
```

### Response

```
Status code: 204 No Content
```


## List data filters

List available data filters for given subset. If the subset is private, then the user must be authenticated and owner of given workspace and subset.

```
GET /api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/filters/
```

### Response

```
Status code: 200 OK

{
  "subset": {
    "alias": "My Subset",
    "active": true,
    "subset_uuid": "a2115009-55ea-49ef-8c1e-50872de3a87e",
    "status": "editable",
    "time": {
      "year_interval": [2013, 2019]
    },
    "areas": [
      {
        "label": "SE1",
        "children": [
          {
            "label": "20 - Norra Kvarkens inre kustvatten",
            "children": [
              {
                "label": "\u00d6refj\u00e4rden",
                "active": false,
                "type": "water_body",
                "value": "SE633000-195000",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE633000-195000"
              },
              {
                "label": "Mj\u00f6lefj\u00e4rden",
                "active": false,
                "type": "water_body",
                "value": "SE633710-200500",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE633710-200500"
              }
            ],
            "active": false,
            "type": "type_area",
            "value": "20",
            "status": "selectable"
          },
          {
            "label": "21 - Norra Kvarkens yttre kustvatten",
            "children": [
              {
                "label": "S n Kvarkens kustvatten",
                "active": false,
                "type": "water_body",
                "value": "SE633550-200700",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE633550-200700"
              },
              {
                "label": "N n Kvarkens kustvatten",
                "active": false,
                "type": "water_body",
                "value": "SE635300-205251",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE635300-205251"
              }
            ],
            "active": false,
            "type": "type_area",
            "value": "21",
            "status": "selectable"
          }
        ]
      },
      {
        "label": "SE2",
        "children": [
          {
            "label": "16 - S\u00f6dra Bottenhavet, inre kustvatten",
            "children": [
              {
                "label": "Ortalaviken",
                "active": false,
                "type": "water_body",
                "value": "SE600565-184600",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE600565-184600"
              },
              {
                "label": "Edeboviken",
                "active": false,
                "type": "water_body",
                "value": "SE600740-183460",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE600740-183460"
              }
            ],
            "active": false,
            "type": "type_area",
            "value": "16",
            "status": "selectable"
          },
          {
            "label": "17 - S\u00f6dra Bottenhavet, yttre kustvatten",
            "children": [
              {
                "label": "V\u00e4dd\u00f6 kustvatten",
                "active": false,
                "type": "water_body",
                "value": "SE595730-185850",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE595730-185850"
              },
              {
                "label": "\u00d6sthammars kustvatten",
                "active": false,
                "type": "water_body",
                "value": "SE601020-185050",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE601020-185050"
              }
            ],
            "active": false,
            "type": "type_area",
            "value": "17",
            "status": "selectable"
          }
        ]
      }
    ]
  },
  "workspace_uuid": "2e88c176-504a-4823-983b-c9f1cfee00e0",
  "workspace": {
    "workspace_uuid": "2e88c176-504a-4823-983b-c9f1cfee00e0",
    "status": "editable",
    "alias": "My Workspace"
  }
}
```


## Create indicators

Creating indicator settings requires the user to be authenticated, and to be the owner of given workspace and subset.

```
POST /api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/indicators/
```

### Parameters

Name | Type | Description
---- | ---- | -----------
`subset` | `object` | Information about the subset in the same format as received in [listing filters](#list-data-filters).
`workspace_uuid` | `string` | ?
`workspace` | `object` | ?

#### Example

```
{
  "subset": {
    "alias": "My Subset",
    "active": true,
    "subset_uuid": "a2115009-55ea-49ef-8c1e-50872de3a87e",
    "status": "editable",
    "time": {
      "year_interval": [2011, 2017]
    },
    "areas": [
      {
        "label": "SE1",
        "children": [
          {
            "label": "20 - Norra Kvarkens inre kustvatten",
            "children": [
              {
                "label": "\u00d6refj\u00e4rden",
                "active": false,
                "type": "water_body",
                "value": "SE633000-195000",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE633000-195000"
              },
              {
                "label": "Mj\u00f6lefj\u00e4rden",
                "active": true,
                "type": "water_body",
                "value": "SE633710-200500",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE633710-200500"
              }
            ],
            "active": true,
            "type": "type_area",
            "value": "20",
            "status": "selectable"
          },
          {
            "label": "21 - Norra Kvarkens yttre kustvatten",
            "children": [
              {
                "label": "S n Kvarkens kustvatten",
                "active": false,
                "type": "water_body",
                "value": "SE633550-200700",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE633550-200700"
              },
              {
                "label": "N n Kvarkens kustvatten",
                "active": false,
                "type": "water_body",
                "value": "SE635300-205251",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE635300-205251"
              }
            ],
            "active": false,
            "type": "type_area",
            "value": "21",
            "status": "selectable"
          }
        ]
      },
      {
        "label": "SE2",
        "children": [
          {
            "label": "16 - S\u00f6dra Bottenhavet, inre kustvatten",
            "children": [
              {
                "label": "Ortalaviken",
                "active": false,
                "type": "water_body",
                "value": "SE600565-184600",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE600565-184600"
              },
              {
                "label": "Edeboviken",
                "active": false,
                "type": "water_body",
                "value": "SE600740-183460",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE600740-183460"
              }
            ],
            "active": false,
            "type": "type_area",
            "value": "16",
            "status": "selectable"
          },
          {
            "label": "17 - S\u00f6dra Bottenhavet, yttre kustvatten",
            "children": [
              {
                "label": "V\u00e4dd\u00f6 kustvatten",
                "active": false,
                "type": "water_body",
                "value": "SE595730-185850",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE595730-185850"
              },
              {
                "label": "\u00d6sthammars kustvatten",
                "active": false,
                "type": "water_body",
                "value": "SE601020-185050",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE601020-185050"
              }
            ],
            "active": false,
            "type": "type_area",
            "value": "17",
            "status": "selectable"
          }
        ]
      }
    ]
  },
  "workspace_uuid": "2e88c176-504a-4823-983b-c9f1cfee00e0",
  "workspace": {
    "workspace_uuid": "2e88c176-504a-4823-983b-c9f1cfee00e0",
    "status": "editable",
    "alias": "My Workspace"
  }
}
```


### Response

```
Status code: 201 Created

{
  "subset": {
    "alias": "My Subset",
    "active": true,
    "subset_uuid": "a2115009-55ea-49ef-8c1e-50872de3a87e",
    "status": "editable",
    "time": {
      "year_interval": [2011, 2017]
    },
    "areas": [
      {
        "label": "SE1",
        "children": [
          {
            "label": "20 - Norra Kvarkens inre kustvatten",
            "children": [
              {
                "label": "\u00d6refj\u00e4rden",
                "active": false,
                "type": "water_body",
                "value": "SE633000-195000",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE633000-195000"
              },
              {
                "label": "Mj\u00f6lefj\u00e4rden",
                "active": true,
                "type": "water_body",
                "value": "SE633710-200500",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE633710-200500"
              }
            ],
            "active": true,
            "type": "type_area",
            "value": "20",
            "status": "selectable"
          },
          {
            "label": "21 - Norra Kvarkens yttre kustvatten",
            "children": [
              {
                "label": "S n Kvarkens kustvatten",
                "active": false,
                "type": "water_body",
                "value": "SE633550-200700",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE633550-200700"
              },
              {
                "label": "N n Kvarkens kustvatten",
                "active": false,
                "type": "water_body",
                "value": "SE635300-205251",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE635300-205251"
              }
            ],
            "active": false,
            "type": "type_area",
            "value": "21",
            "status": "selectable"
          }
        ]
      },
      {
        "label": "SE2",
        "children": [
          {
            "label": "16 - S\u00f6dra Bottenhavet, inre kustvatten",
            "children": [
              {
                "label": "Ortalaviken",
                "active": false,
                "type": "water_body",
                "value": "SE600565-184600",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE600565-184600"
              },
              {
                "label": "Edeboviken",
                "active": false,
                "type": "water_body",
                "value": "SE600740-183460",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE600740-183460"
              }
            ],
            "active": false,
            "type": "type_area",
            "value": "16",
            "status": "selectable"
          },
          {
            "label": "17 - S\u00f6dra Bottenhavet, yttre kustvatten",
            "children": [
              {
                "label": "V\u00e4dd\u00f6 kustvatten",
                "active": false,
                "type": "water_body",
                "value": "SE595730-185850",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE595730-185850"
              },
              {
                "label": "\u00d6sthammars kustvatten",
                "active": false,
                "type": "water_body",
                "value": "SE601020-185050",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE601020-185050"
              }
            ],
            "active": false,
            "type": "type_area",
            "value": "17",
            "status": "selectable"
          }
        ]
      }
    ]
  },
  "supporting_elements": [
    {
      "label": "secchi depth",
      "children": [
        {
          "settings": [],
          "label": "Secchi ",
          "status": "not selectable",
          "selected": false,
          "value": "secchi"
        }
      ]
    },
    {
      "label": "nutrients",
      "children": [
        {
          "settings": [],
          "label": "DIN winter",
          "status": "not selectable",
          "selected": false,
          "value": "din_winter"
        },
        {
          "settings": [],
          "label": "DIP winter",
          "status": "not selectable",
          "selected": false,
          "value": "dip_winter"
        },
        {
          "settings": [],
          "label": "Ntot summer",
          "status": "not selectable",
          "selected": false,
          "value": "ntot_summer"
        },
        {
          "settings": [],
          "label": "Ntot winter",
          "status": "not selectable",
          "selected": false,
          "value": "ntot_winter"
        },
        {
          "settings": [],
          "label": "Ptot summer",
          "status": "not selectable",
          "selected": false,
          "value": "ptot_summer"
        },
        {
          "settings": [],
          "label": "Ptot winter",
          "status": "not selectable",
          "selected": false,
          "value": "ptot_winter"
        }
      ]
    },
    {
      "label": "oxygen balance",
      "children": [
        {
          "settings": [],
          "label": "oxygen",
          "status": "not selectable",
          "selected": false,
          "value": "oxygen"
        }
      ]
    }
  ],
  "quality_elements": [
    {
      "label": "bottom fauna",
      "children": [
        {
          "settings": [],
          "label": "BQI",
          "status": "not selectable",
          "selected": false,
          "value": "bqi"
        }
      ]
    },
    {
      "label": "macroalgae and macrophytes",
      "children": [
        {
          "settings": [],
          "label": "MSMDI",
          "status": "not selectable",
          "selected": false,
          "value": "msmdi"
        }
      ]
    },
    {
      "label": "phytoplankton",
      "children": [
        {
          "settings": [],
          "label": "Biovolume",
          "status": "not selectable",
          "selected": false,
          "value": "biov"
        },
        {
          "settings": [],
          "label": "Chlorophyll",
          "status": "not selectable",
          "selected": false,
          "value": "chl"
        }
      ]
    }
  ],
  "workspace_uuid": "2e88c176-504a-4823-983b-c9f1cfee00e0",
  "workspace": {
    "workspace_uuid": "2e88c176-504a-4823-983b-c9f1cfee00e0",
    "status": "editable",
    "alias": "My Workspace"
  }
}
```


## Edit indicators

Editing indicators and settings requires the user to be authenticated, and to be the owner of given workspace and subset.

```
PATCH /api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/indicators/
```

### Parameters

Name | Type | Description
`subset` | `object` | Information about the subset in the same format as received in [creating indicators](#create-indicators).
`supporting_elements` | `array` | An array of supporting element objects.
`quality_elements` | `array` | An Array of quality element objects.

#### Example

```
{
  "subset": {
    "alias": "My Subset",
    "active": true,
    "subset_uuid": "a2115009-55ea-49ef-8c1e-50872de3a87e",
    "status": "editable",
    "time": {
      "year_interval": [2011, 2017]
    },
    "areas": [
      {
        "label": "SE1",
        "children": [
          {
            "label": "20 - Norra Kvarkens inre kustvatten",
            "children": [
              {
                "label": "\u00d6refj\u00e4rden",
                "active": false,
                "type": "water_body",
                "value": "SE633000-195000",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE633000-195000"
              },
              {
                "label": "Mj\u00f6lefj\u00e4rden",
                "active": true,
                "type": "water_body",
                "value": "SE633710-200500",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE633710-200500"
              }
            ],
            "active": true,
            "type": "type_area",
            "value": "20",
            "status": "selectable"
          },
          {
            "label": "21 - Norra Kvarkens yttre kustvatten",
            "children": [
              {
                "label": "S n Kvarkens kustvatten",
                "active": false,
                "type": "water_body",
                "value": "SE633550-200700",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE633550-200700"
              },
              {
                "label": "N n Kvarkens kustvatten",
                "active": false,
                "type": "water_body",
                "value": "SE635300-205251",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE635300-205251"
              }
            ],
            "active": false,
            "type": "type_area",
            "value": "21",
            "status": "selectable"
          }
        ]
      },
      {
        "label": "SE2",
        "children": [
          {
            "label": "16 - S\u00f6dra Bottenhavet, inre kustvatten",
            "children": [
              {
                "label": "Ortalaviken",
                "active": false,
                "type": "water_body",
                "value": "SE600565-184600",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE600565-184600"
              },
              {
                "label": "Edeboviken",
                "active": false,
                "type": "water_body",
                "value": "SE600740-183460",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE600740-183460"
              }
            ],
            "active": false,
            "type": "type_area",
            "value": "16",
            "status": "selectable"
          },
          {
            "label": "17 - S\u00f6dra Bottenhavet, yttre kustvatten",
            "children": [
              {
                "label": "V\u00e4dd\u00f6 kustvatten",
                "active": false,
                "type": "water_body",
                "value": "SE595730-185850",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE595730-185850"
              },
              {
                "label": "\u00d6sthammars kustvatten",
                "active": false,
                "type": "water_body",
                "value": "SE601020-185050",
                "status": "selectable",
                "url": " http://www.viss.lansstyrelsen.se/waters.aspx?waterEUID=SE601020-185050"
              }
            ],
            "active": false,
            "type": "type_area",
            "value": "17",
            "status": "selectable"
          }
        ]
      }
    ]
  },
  "supporting_elements": [
    {
      "label": "secchi depth",
      "children": [
        {
          "settings": [],
          "label": "Secchi ",
          "status": "not selectable",
          "selected": false,
          "value": "secchi"
        }
      ]
    },
    {
      "label": "nutrients",
      "children": [
        {
          "settings": [],
          "label": "DIN winter",
          "status": "not selectable",
          "selected": true,
          "value": "din_winter"
        },
        {
          "settings": [],
          "label": "DIP winter",
          "status": "not selectable",
          "selected": false,
          "value": "dip_winter"
        },
        {
          "settings": [],
          "label": "Ntot summer",
          "status": "not selectable",
          "selected": false,
          "value": "ntot_summer"
        },
        {
          "settings": [],
          "label": "Ntot winter",
          "status": "not selectable",
          "selected": false,
          "value": "ntot_winter"
        },
        {
          "settings": [],
          "label": "Ptot summer",
          "status": "not selectable",
          "selected": false,
          "value": "ptot_summer"
        },
        {
          "settings": [],
          "label": "Ptot winter",
          "status": "not selectable",
          "selected": false,
          "value": "ptot_winter"
        }
      ]
    },
    {
      "label": "oxygen balance",
      "children": [
        {
          "settings": [],
          "label": "oxygen",
          "status": "not selectable",
          "selected": true,
          "value": "oxygen"
        }
      ]
    }
  ],
  "quality_elements": [
    {
      "label": "bottom fauna",
      "children": [
        {
          "settings": [],
          "label": "BQI",
          "status": "not selectable",
          "selected": false,
          "value": "bqi"
        }
      ]
    },
    {
      "label": "macroalgae and macrophytes",
      "children": [
        {
          "settings": [],
          "label": "MSMDI",
          "status": "not selectable",
          "selected": false,
          "value": "msmdi"
        }
      ]
    },
    {
      "label": "phytoplankton",
      "children": [
        {
          "settings": [],
          "label": "Biovolume",
          "status": "not selectable",
          "selected": false,
          "value": "biov"
        },
        {
          "settings": [],
          "label": "Chlorophyll",
          "status": "not selectable",
          "selected": false,
          "value": "chl"
        }
      ]
    }
  ],
  "workspace_uuid": "2e88c176-504a-4823-983b-c9f1cfee00e0",
  "workspace": {
    "workspace_uuid": "2e88c176-504a-4823-983b-c9f1cfee00e0",
    "status": "editable",
    "alias": "My Workspace"
  }
}
```


### Response

```
Status code: 200 OK

{
  "supporting_elements": [
    {
      "label": "secchi depth",
      "children": [
        {
          "label": "Secchi ",
          "status": "selectable",
          "selected": false,
          "value": "secchi",
          "settings": [
            {
              "label": "7 - Sk\u00e5nes kustvatten",
              "area_type": "type_area",
              "value": "7",
              "children": [
                {
                  "label": "MIN_NR_YEARS",
                  "value": "MIN_NR_YEARS",
                  "children": 3,
                  "status": "editable"
                },
                {
                  "label": "Month interval",
                  "value": "MONTH_LIST",
                  "children": [6, 8],
                  "status": "editable"
                }
              ]
            },
            {
              "label": "5 - S\u00f6dra Halland och norra \u00d6resunds kustvatten",
              "area_type": "type_area",
              "value": "5",
              "children": [
                {
                  "label": "MIN_NR_YEARS",
                  "value": "MIN_NR_YEARS",
                  "children": 3,
                  "status": "editable"
                },
                {
                  "label": "Month interval",
                  "value": "MONTH_LIST",
                  "children": [6, 8],
                  "status": "editable"
                }
              ]
            },
          ]
        }
      ]
    },
    {
      "label": "nutrients",
      "children": [
        {
          "label": "DIN winter",
          "status": "selectable",
          "selected": true,
          "value": "din_winter",
          "settings": [
            {
              "label": "7 - Sk\u00e5nes kustvatten",
              "area_type": "type_area",
              "value": "7",
              "children": [
                {
                  "label": "MIN_NR_YEARS",
                  "value": "MIN_NR_YEARS",
                  "children": 3,
                  "status": "editable"
                },
                {
                  "label": "Month interval",
                  "value": "MONTH_LIST",
                  "children": [12, 2],
                  "status": "editable"
                },
                {
                  "label": "Depth interval ",
                  "value": "DEPH_INTERVAL",
                  "children": [0, 10],
                  "status": "editable"
                }
              ]
            },
            {
              "label": "5 - S\u00f6dra Halland och norra \u00d6resunds kustvatten",
              "area_type": "type_area",
              "value": "5",
              "children": [
                {
                  "label": "MIN_NR_YEARS",
                  "value": "MIN_NR_YEARS",
                  "children": 3,
                  "status": "editable"
                },
                {
                  "label": "Month interval",
                  "value": "MONTH_LIST",
                  "children": [12, 3],
                  "status": "editable"
                },
                {
                  "label": "Depth interval ",
                  "value": "DEPH_INTERVAL",
                  "children": [0, 10],
                  "status": "editable"
                }
              ]
            }
          ]
        },
        {
          "label": "DIP winter",
          "status": "selectable",
          "selected": false,
          "value": "dip_winter",
          "settings": [
            {
              "label": "7 - Sk\u00e5nes kustvatten",
              "area_type": "type_area",
              "value": "7",
              "children": [
                {
                  "label": "MIN_NR_YEARS",
                  "value": "MIN_NR_YEARS",
                  "children": 3,
                  "status": "editable"
                },
                {
                  "label": "Month interval",
                  "value": "MONTH_LIST",
                  "children": [12, 2],
                  "status": "editable"
                },
                {
                  "label": "Depth interval ",
                  "value": "DEPH_INTERVAL",
                  "children": [0, 10],
                  "status": "editable"
                }
              ]
            },
            {
              "label": "5 - S\u00f6dra Halland och norra \u00d6resunds kustvatten",
              "area_type": "type_area",
              "value": "5",
              "children": [
                {
                  "label": "MIN_NR_YEARS",
                  "value": "MIN_NR_YEARS",
                  "children": 3,
                  "status": "editable"
                },
                {
                  "label": "Month interval",
                  "value": "MONTH_LIST",
                  "children": [12, 3],
                  "status": "editable"
                },
                {
                  "label": "Depth interval ",
                  "value": "DEPH_INTERVAL",
                  "children": [0, 10],
                  "status": "editable"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "label": "oxygen balance",
      "children": [
        {
          "label": "oxygen",
          "status": "selectable",
          "selected": true,
          "value": "oxygen",
          "settings": [
            {
              "label": "7 - Sk\u00e5nes kustvatten",
              "area_type": "type_area",
              "value": "7",
              "children": [
                {
                  "label": "MIN_NR_YEARS",
                  "value": "MIN_NR_YEARS",
                  "children": 3,
                  "status": "editable"
                },
                {
                  "label": "BOTTOM_WATER",
                  "value": "BOTTOM_WATER",
                  "children": 10,
                  "status": "editable"
                }
              ]
            },
            {
              "label": "5 - S\u00f6dra Halland och norra \u00d6resunds kustvatten",
              "area_type": "type_area",
              "value": "5",
              "children": [
                {
                  "label": "MIN_NR_YEARS",
                  "value": "MIN_NR_YEARS",
                  "children": 3,
                  "status": "editable"
                },
                {
                  "label": "BOTTOM_WATER",
                  "value": "BOTTOM_WATER",
                  "children": 10,
                  "status": "editable"
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "quality_elements": [
    {
      "label": "bottom fauna",
      "children": [
        {
          "settings": [],
          "label": "BQI",
          "status": "not selectable",
          "selected": false,
          "value": "bqi"
        }
      ]
    },
    {
      "label": "macroalgae and macrophytes",
      "children": [
        {
          "settings": [],
          "label": "MSMDI",
          "status": "not selectable",
          "selected": false,
          "value": "msmdi"
        }
      ]
    },
    {
      "label": "phytoplankton",
      "children": [
        {
          "settings": [],
          "label": "Biovolume",
          "status": "not selectable",
          "selected": false,
          "value": "biov"
        },
        {
          "settings": [],
          "label": "Chlorophyll",
          "status": "not selectable",
          "selected": false,
          "value": "chl"
        }
      ]
    }
  ]
}
```
