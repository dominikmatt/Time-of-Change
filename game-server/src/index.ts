import gameEngine from './gameEngine';
import { BootstrapWebsocket } from './WsConnection';
import './Map/Map';
import Core from './Core';
import Map from './Map/Map';
import { Environments } from './enums/Environments';
import { GameStates } from './enums/gameStates';

const main = async () => {
  await Core.bootstrap();
  await Map.generateMap();
  await BootstrapWebsocket();

  // Start game immediately in development mode
  if (Environments.development === process.env.NODE_ENV) {
    Core.gameState = GameStates.Started;
  } else {
    setTimeout(() => Core.gameState = GameStates.Started, 300000);
  }

  // Start game
  gameEngine.startGame();
};

main();

