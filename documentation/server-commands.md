# Commands from Server to Client

### building.update
This command is thrown when a building has been updated.

##### Parameters
- Full building information.

| Parameter     | Required      | Type              | Description            |
| ------------- |:-------------:|:-----------------:|:-----------------------|
| id            | true          | int               | unique id of building  |
| playerId      | true          | int               | Id of the player (1-4) |
| Position      | true          | PositionInterface | Position on map        |
| type          | true          | string            | Type of building       |
    
### map.update
This command is thrown when a map coordinate has been changed.

#### Parameters

| Parameter     | Required      | Type    | Description                 |
| ------------- |:-------------:|:-------:|:----------------------------|
| x             | true          | int     | x coordinate                |
| y             | true          | int     | y coordinate                |
| hasTree       | true          | boolean | has this coordinate a tree? |


### character.update
This command is thrown when a character has been updated.

##### Parameters
- Full character information.

| Parameter     | Required      | Type              | Description           |
| ------------- |:-------------:|:-----------------:|:----------------------|
| id            | true          | int               | unique id of building |
| Position      | true          | PositionInterface | Position on map       |
| type          | true          | string            | Type of building      |

### panel.update
This command is thrown when a panel has new information.

##### Parameter

| Parameter     | Required      | Type              | Description           |
| ------------- |:-------------:|:-----------------:|:----------------------|

### game.update
This command is thrown when a game-state has been updated.

##### Parameters
- Full character information.

| Parameter     | Required      | Type              | Description             |
| ------------- |:-------------:|:-----------------:|:------------------------|
| gameStatus    | false         | String            | GameStates value        |
| playersCount  | false         | Int               | Connected players count |
