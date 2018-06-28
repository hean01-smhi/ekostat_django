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

Parameters for `GET` request should be specified in the query string of the URL, and parameters for `POST`, `PUT` and `DELETE` requests should be encoded as JSON in the request body.


## Overview

The table shown below is an overview of available API calls with corresponding info on how it should be used in a HTTP context, and also how it maps to the core calculator library. The API calls are explained in further details later in this document.

Description | Verb | Path | Core reference
----------- | ---- | ---- | -------------------
[List workspaces](#list-workspaces) | `GET` | `/api/v1/workspaces` | [`request_workspace_list`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_workspace_list%22)
[Create a workspace](#create-a-workspace) | `POST` | `/api/v1/workspaces` | [`request_workspace_add`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_workspace_add%22)
[Edit a workspace](#edit-a-workspace) | `POST` | `/api/v1/workspaces/<workspace_uuid>` | [`request_workspace_edit`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_workspace_edit%22)
[Delete a workspace](#delete-a-workspace) | `DELETE` | `/api/v1/workspaces/<workspace_uuid>`| [`request_workspace_delete`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_workspace_delete%22)
[List data sources](#list-data-sources) | `GET` | `/api/v1/workspaces/<workspace_uuid>/sources` | [`request_workspace_data_sources_list`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_workspace_data_sources_list%22)
[Edit data sources](#edit-data-sources) | `POST` | `/api/v1/workspaces/<workspace_uuid>/sources` | [`request_workspace_data_sources_edit`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_workspace_data_sources_edit%22)
[List subsets](#list-subsets) | `GET` | `/api/v1/workspaces/<workspace_uuid>/subsets` | [`request_subset_list`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_subset_list%22)
[Create a subset](#create-a-subset) | `POST` | `/api/v1/workspaces/<workspace_uuid>/subsets` | [`request_subset_add`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_subset_add%22)
[Edit a subset](#edit-a-subset) | `POST` | `/api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>` | [`request_subset_edit`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_subset_edit%22)
[Delete a subset](#delete-a-subset) | `DELETE` | `/api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>` | [`request_subset_delete`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_subset_delete%22)
[List data filters](#list-data-filters) | `GET` | `/api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/filters` | [`request_subset_get_data_filter`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_subset_get_data_filter%22)
[Edit data filters](#edit-data-filters) | `POST` | `/api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/filters` | ?
[List indicators](#list-indicators) | `GET` | `/api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/indicators` | [`request_subset_get_indicator_settings`](https://github.com/ekostat/ekostat_calculator/search?q=%22def+request_subset_get_indicator_settings%22)
[Edit indicators](#edit-indicators) | `POST` | `/api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/indicators` | ?


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
POST /api/v1/authenticate
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
POST /api/v1/reauthenticate
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
GET /api/v1/workspaces
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
POST /api/v1/workspaces
```

### Parameters

Name | Type | Description
---- | ---- | -----------
`alias` | `string` | Alias name for the new workspace.
`source` | `string` | UUID of the workspace to be used as source for the new workspace.

#### Example

```
{
  "alias": "My Workspace",
  "source": "default_workspace"
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
POST /api/v1/workspaces/<workspace_uuid>
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
DELETE /api/v1/workspaces/<workspace_uuid>
```

### Response

```
Status code: 204 No Content
```


## List data sources

List data sources available for given workspace. If the workspace is private, then the user must be authenticated and owner of the workspace.

```
GET /api/v1/workspaces/<workspace_uuid>/sources
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
POST /api/v1/workspaces/<workspace_uuid>/sources
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


## List subsets

List subsets for a given workspace. If the workspace is private, then the user must be authenticated and owner of the workspace.

```
GET /api/v1/workspaces/<workspace_uuid>/subsets
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
POST /api/v1/workspaces/<workspace_uuid>/subsets
```

### Parameters

Name | Type | Description
---- | ---- | -----------
`subset_uuid` | `string` | UUID for the subset to be used as source for the new subset.
`alias` | `string` | Alias name for the new subset.

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
POST /api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>
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
DELETE /api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>
```

### Response

```
Status code: 204 No Content
```

## List data filters

List available data filters for given subset. If the subset is private, then the user must be authenticated and owner of given workspace and subset.

```
GET /api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/filters
```

### Response

```
Status code: 200 OK

?
```


## Edit data filters

Editing data filters requires the user to be authenticated, and to be the owner of given workspace and subset.

```
POST /api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/filters
```

### Parameters

?

### Response

```
Status code: 200 OK

?
```


## List indicators

List available indicator and settings for given subset. If the subset is private, then the user must be authenticated and owner of given workspace and subset.

```
GET /api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/indicators
```

### Response

```
Status code: 200 OK

?
```


## Edit indicators

Editing indicators and settings requires the user to be authenticated, and to be the owner of given workspace and subset.

```
POST /api/v1/workspaces/<workspace_uuid>/subsets/<subset_uuid>/indicators
```

### Parameters

?

### Response

```
Status code: 200 OK

?
```
