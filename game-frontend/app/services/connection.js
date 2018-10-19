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
    connect(username) {
        return new Promise((resolve) => {
            console.info('ToC: Connected to game-server. https://tocgs-01.time-of-changes.com');
            this._socket = io('https://tocgs-01.time-of-changes.com', {
                secure: true,
                query: {
                    username: username,
                    token: `${username}-token`
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