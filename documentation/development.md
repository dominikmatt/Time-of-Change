# Development

## Start
#### Start Game-Server
Goto `dev-infra`
Run `docker-compose up`
Goto `game-server`
Run `NODE_ENV=development npm run start:dev`

#### Start Game Frontend 
Goto `game-frontend`
Run `npm run start:tsc`
Run `ELECTRON_ENV=dev npm run start`

### Start Lobby
Goto `lobby`
Run `npm run start`

## Ports
- 9990: Redis database
- 9991: Game Server 