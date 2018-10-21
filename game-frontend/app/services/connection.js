"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io-client");
const config_1 = require("../configuration/config");
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
            console.info(`ToC: Connected to game-server. ${config_1.default.get('connection').ws}`);
            this._socket = io(config_1.default.get('connection').ws, {
                secure: config_1.default.get('connection').ssl,
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