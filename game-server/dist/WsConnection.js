"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Core_1 = __importDefault(require("./Core"));
const Player_1 = __importDefault(require("./Player"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const panel_1 = __importDefault(require("./Panel/panel"));
const express_1 = __importDefault(require("express"));
const addUserRoute_1 = __importDefault(require("./api/routes/addUserRoute"));
const bodyParser = require("body-parser");
const Core_2 = __importDefault(require("./Core"));
const app = express_1.default();
app.use(bodyParser());
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server);
let playerId = 1;
;
addUserRoute_1.default(app);
/**
 * Check if connectiondata like token and username has been set on the connection request.
 */
io.use((socket, next) => {
    const query = socket.handshake.query;
    const token = query.token || '';
    Core_2.default.db.hgetall(`players:${token}`)
        .then((result) => {
        if (null !== result) {
            return next();
        }
        else {
            return next(new Error('Authentication error'));
        }
    });
});
/**
 * Player has connected.
 * Create a new player or connect to the given player-instance.
 */
io.on('connection', (socket) => {
    const query = socket.handshake.query;
    const token = query.token;
    Core_2.default.db.hgetall(`players:${token}`)
        .then((playerData) => {
        // Player is already connected set the new socket to player and bind listeners.
        if (Core_1.default.players[token]) {
            Core_1.default.players[token].wsSocket = socket;
            Core_1.default.players[token].listenWs();
            console.log('ok');
            return;
        }
        console.log('ok new');
        // Create a new player.
        const newPlayer = new Player_1.default(playerData.username, token, playerId);
        playerId++;
        Core_1.default.addPlayer(newPlayer);
        newPlayer.wsSocket = socket;
        newPlayer.listenWs();
        newPlayer.initializeTown();
        panel_1.default.player = newPlayer;
        panel_1.default.initialize();
        socket.on('disconnect', function () {
            console.log('disconnected');
        });
    });
});
server.listen(9100);
//# sourceMappingURL=WsConnection.js.map