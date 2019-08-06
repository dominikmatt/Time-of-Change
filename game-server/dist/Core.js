"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Redis_1 = __importDefault(require("./Redis"));
const gameStates_1 = require("./enums/gameStates");
const Environments_1 = require("./enums/Environments");
;
/**
 * The Core Class stores all data like the current tick, settings and instances of the Game.
 * Here we do not like to have imports and dependencies to other classes.
 */
class Core {
    constructor() {
        this._players = {};
        this._gameState = gameStates_1.GameStates.WaitingForPlayers;
        this._db = new Redis_1.default(0);
        this._db.flushdb()
            .then(() => console.log('database cleared'))
            .catch((error) => { throw new Error(error); });
        const player1redis = new Redis_1.default(1);
        player1redis.flushdb()
            .then(() => console.log('database cleared player 1'))
            .catch((error) => { throw new Error(error); });
        const player2redis = new Redis_1.default(1);
        player2redis.flushdb()
            .then(() => console.log('database cleared player 2'))
            .catch((error) => { throw new Error(error); });
        // Start game immediately in development mode
        if (Environments_1.Environments.development === process.env.NODE_ENV) {
            this.gameState = gameStates_1.GameStates.Started;
        }
        else {
            setTimeout(() => this.gameState = gameStates_1.GameStates.Started, 300000);
        }
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
    set gameState(gameState) {
        this.emitAll('game.update', {
            gameState,
            playersCount: Object.keys(this.players).length,
        });
        this._gameState = gameState;
    }
    get gameState() {
        return this._gameState;
    }
}
exports.default = Core.Instance;
//# sourceMappingURL=Core.js.map