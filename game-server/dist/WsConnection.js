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
const app = http_1.default.createServer(() => { });
const io = socket_io_1.default(app);
let playerId = 1;
;
app.listen(9100);
/**
 * Check if connectiondata like token and username has been set on the connection request.
 */
io.use((socket, next) => {
    const query = socket.handshake.query;
    const token = query.token || '';
    const username = query.username || '';
    if ('' !== token && '' !== username) {
        return next();
    }
    else {
        return next(new Error('Authentication error'));
    }
});
/**
 * Player has connected.
 * Create a new player or connect to the given player-instance.
 */
io.on('connection', (socket) => {
    console.log('connected');
    const query = socket.handshake.query;
    const token = query.token;
    // Player is already connected set the new socket to player and bind listeners.
    if (Core_1.default.players[token]) {
        Core_1.default.players[token].wsSocket = socket;
        Core_1.default.players[token].listenWs();
        return;
    }
    // Create a new player.
    const newPlayer = new Player_1.default(query.username, token, playerId);
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
//# sourceMappingURL=WsConnection.js.map