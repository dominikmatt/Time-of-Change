# Development

## Start
### Start Game-Server
- goto game server package
  ```shell
    cd game-server
  ```  
- Start all services for game server
  ```shell
    docker-compose -f docker-compose.dev.yml up
   ```  
- Start Game Server
  ```shell
    NODE_ENV=development npm run start:dev
  ```

### Start Game Frontend 
- goto game client package
  ```shell
    cd game-frontend
  ```  
- Watch for file changes
  ```shell
    npm run start:watch
   ```  
- Start Client
  ```shell
    npm run start:dev
  ```

### Start Lobby
Goto `lobby`
Run `npm run start`

## Ports
- 9990: Redis database
- 9991: Game Server 
