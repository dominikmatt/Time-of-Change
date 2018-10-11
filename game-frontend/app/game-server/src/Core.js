"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis_1 = require("./Redis");
;
/**
 * The Core Class stores all data like the current tick, settings and instances of the Game.
 * Here we do not like to have imports and dependencies to other classes.
 */
class Core {
    constructor() {
        this._players = {};
        this._db = new Redis_1.default(0);
        this._db.flushdb()
            .then(() => console.log('database cleared'))
            .catch((error) => { throw new Error(error); });
    }
    addPlayer(player) {
        this._players[player.token] = player;
    }
    emitAll(event, value) {
        Object.keys(this._players).forEach((playerKey) => {
            const player = this._players[playerKey];
            player.wsSocket.emit(event, value);
        });
    }
    get currentTick() {
        return this._currentTick;
    }
    set currentTick(value) {
        this._currentTick = value;
    }
    get players() {
        return this._players;
    }
    get db() {
        return this._db;
    }
    static get Instance() {
        return this.instance || (this.instance = new this());
    }
}
exports.default = Core.Instance;
//# sourceMappingURL=Core.js.map