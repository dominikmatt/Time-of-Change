# Development

## Start
#### Start Game-Server
Goto `dev-infra`
Run `docker-compose up`
Goto `game-server`
Run `npm run start:dev`

#### Start Game Frontend 
Goto `game-frontend`
Run `npm run start:tsc`
Run `npm run start`

### Start Lobby
Goto `lobby`
Run `npm run start`

## Ports
- 9990: Redis database
- 9991: Game Server 