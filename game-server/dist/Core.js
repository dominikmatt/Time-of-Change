"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
/**
 * The Core Class stores all data like the current tick, settings and instances of the Game.
 * Here we do not like to have imports and dependencies to other classes.
 */
class Core {
    constructor() {
        this._players = {};
    }
    addPlayer(player) {
        this._players[player.token] = player;
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
    static get Instance() {
        return this.instance || (this.instance = new this());
    }
}
exports.default = Core.Instance;
//# sourceMappingURL=Core.js.map