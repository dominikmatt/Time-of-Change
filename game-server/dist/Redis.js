"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
class Redis {
    constructor(player) {
        this._player = player;
        this.connect();
    }
    connect() {
        this._client = redis_1.default.createClient();
        this._client.on('error', (err) => {
            console.log('Redis Error ' + err);
        });
    }
    hset(key, field, value, addToken = true) {
        if (addToken) {
            key = this._player.token + '_' + key;
        }
        this._client.hset(key, field, value);
    }
}
exports.default = Redis;
//# sourceMappingURL=Redis.js.map