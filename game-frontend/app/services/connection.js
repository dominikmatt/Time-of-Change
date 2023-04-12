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
    connect(token) {
        return new Promise((resolve) => {
            console.info(`ToC:  Connected to game-server. ${config_1.default.get('connection').ws}`);
            this._socket = io(config_1.default.get('connection').ws, {
                secure: config_1.default.get('connection').ssl,
                transports: ['websocket'],
                query: {
                    token: token
                },
            });
            // @ts-ignore
            this._socket.on("error", (error) => {
                console.log(error);
            });
            // @ts-ignore
            this._socket.on("connect_error", (error) => {
                console.log(error);
            });
            // @ts-ignore
            this._socket.on("connect_timeout", (error) => {
                console.log(error);
            });
            // @ts-ignore
            this._socket.on("connecting", (error) => {
                console.log(error);
            });
            // @ts-ignore
            this._socket.on('connect', (args) => {
                console.log('connected');
                resolve(args);
            });
        });
    }
    get socket() {
        return this._socket;
    }
}
const connectionService = ConnectionService.getInstance();
exports.default = connectionService;
//# sourceMappingURL=connection.js.map