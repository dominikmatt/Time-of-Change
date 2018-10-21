"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const io = __importStar(require("socket.io-client"));
const config_1 = __importDefault(require("../configuration/config"));
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