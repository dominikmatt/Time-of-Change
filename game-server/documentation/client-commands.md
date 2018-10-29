# Commands from Client to Server

### building.create

#### Parameters

| Parameter     | Required      | Type   | Description           |
| ------------- |:-------------:|:------:|:----------------------|
| type          | true          | string | Type name of building |

### character.create
Will add a new character to the queue of the given schoolhouse.

#### Parameters

| Parameter     | Required      | Type   | Description           |
| ------------- |:-------------:|:------:|:----------------------|
| type          | true          | string | Type name of building |
| buildingId    | true          | string | Id of the schoolhouse |

### panel.building.selected
Will create the panel information and send it to the frontend.

#### Parameters

| Parameter     | Required      | Type   | Description           |
| ------------- |:-------------:|:------:|:----------------------|
| buildingId    | true          | string | Id of the building    |

### map.data
Will send all coordinates with their informations to the frontend.

#### Parameters

**No parameters needed**
