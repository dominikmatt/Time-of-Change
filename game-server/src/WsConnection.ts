import core from "./Core";
import Player from "./Player";
import http from 'http';
import Server, {Socket} from 'socket.io';
import panel from "./Panel/panel";
import express from 'express';
import addUserRoute from "./api/routes/addUserRoute";
import * as expressCore from "express-serve-static-core";
import bodyParser = require("body-parser");
import Core from "./Core";


const app: expressCore.Express = express();
app.use(bodyParser());

const server = http.createServer(app);
const io = Server(server);
let playerId: number = 1;

interface QueryInterface {
    username: string;
    token: string;
    [key: string]: string;
};

addUserRoute(app);


/**
 * Check if connectiondata like token and username has been set on the connection request.
 */
io.use((socket: Socket, next: Function) => {
    const query: QueryInterface = socket.handshake.query;
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
        .then((playerData) => {
            // Player is already connected set the new socket to player and bind listeners.
            if ((<any>core).players[token]) {
                (<any>core).players[token].wsSocket = socket;
                (<any>core).players[token].listenWs();

                console.log('ok');
                return;
            }

            console.log('ok new');

            // Create a new player.
            const newPlayer = new Player(playerData.username, token, playerId);
            playerId++;

            core.addPlayer(newPlayer);
            newPlayer.wsSocket = socket;
            newPlayer.listenWs();
            newPlayer.initializeTown();

            panel.player = newPlayer;

            panel.initialize();

            socket.on('disconnect', function () {
                console.log('disconnected');
            });
        });
});

server.listen(9100);