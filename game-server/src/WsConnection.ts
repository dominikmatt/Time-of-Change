import core from './Core';
import Player from './Player';
import http from 'http';
import { Server, Socket } from 'socket.io';
import Panel from './Panel/panel';
import express from 'express';
import addUserRoute from './api/routes/addUserRoute';
import getServerInfoRoute from './api/routes/getServerInfoRoute';
import * as expressCore from 'express-serve-static-core';
import bodyParser = require('body-parser');
import Core from './Core';
import cors from 'cors';
import IPlayerData from './Interfaces/PlayerData';

export const BootstrapWebsocket = async () => {
  const app: expressCore.Express = express();
  app.use(bodyParser());

  const server = http.createServer(app);
  const io = new Server(server);
  let playerId: number = 1;

  interface QueryInterface {
    username: string;
    token: string;

    [key: string]: string;
  };

  app.use(cors());
  addUserRoute(app);
  getServerInfoRoute(app);

  /**
   * Check if connectiondata like token and username has been set on the connection request.
   */
  io.use((socket: Socket, next: Function) => {
    const query: QueryInterface = socket.handshake.query as QueryInterface;
    const token: string = query.token || '';

    Core.db.hgetall(`players:${token}`)
      .then((result) => {
        if (null !== result) {
          return next();
        } else {
          return next(new Error('Authentication error'));
        }
      });
  });

  /**
   * Player has connected.
   * Create a new player or connect to the given player-instance.
   */
  io.on('connection', (socket: any) => {
    const query: QueryInterface = socket.handshake.query;
    const token: string = query.token;

    Core.db.hgetall(`players:${token}`)
      .then(async (playerData: IPlayerData) => {
        // Player is already connected set the new socket to player and bind listeners.
        if ((<any>core).players[token]) {
          (<any>core).players[token].wsSocket = socket;
          (<any>core).players[token].listenWs();

          return;
        }

        // Create a new player.
        const newPlayer = new Player(playerData.username, token, playerId);
        await newPlayer.createDb();
        const panel = new Panel();
        panel.player = newPlayer;
        panel.initialize();

        newPlayer.panel = panel;
        playerId++;

        core.addPlayer(newPlayer);
        newPlayer.wsSocket = socket;
        newPlayer.listenWs();
        newPlayer.initializeTown();

        core.emitAll('game.update', {
          gameState: core.gameState,
          playersCount: Object.keys(core.players).length,
        });

        socket.on('disconnect', function () {
          console.log('disconnected');
        });
      });
  });

  server.listen(9991);
};
