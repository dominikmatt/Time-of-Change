"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Core_1 = __importDefault(require("./Core"));
const Player_1 = __importDefault(require("./Player"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const app = http_1.default.createServer(() => { });
const io = socket_io_1.default(app);
app.listen(9001);
io.use(function (socket, next) {
    const query = socket.handshake.query;
    let isAlreadyConnected = false;
    if (query.token, query.username) {
        if (Core_1.default.players[query.token]) {
            return next(new Error('Player already connected.'));
        }
        return next();
    }
    else {
        return next(new Error('Authentication error'));
    }
});
io.on('connection', (socket) => {
    const query = socket.handshake.query;
    Core_1.default.addPlayer(new Player_1.default(query.username, query.token));
    console.log('New Player:', query.username, query.token);
});
//# sourceMappingURL=Requester.js.map