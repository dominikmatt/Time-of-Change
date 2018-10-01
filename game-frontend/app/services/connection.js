"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io-client");
let instance;
class ConnectionService {
    static getInstance() {
        if (!instance) {
            instance = new ConnectionService();
        }
        return instance;
    }
    connect() {
        return new Promise((resolve) => {
            console.info('ToC: Connected to game-server.');
            this._socket = io('http://127.0.0.1:9100', {
                query: {
                    username: 'player-1',
                    token: 'player-1-token'
                }
            });
            this._socket.on('connect', resolve);
        });
    }
    get socket() {
        return this._socket;
    }
}
const connectionService = ConnectionService.getInstance();
exports.default = connectionService;
//# sourceMappingURL=connection.js.map