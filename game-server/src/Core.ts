///<reference path="Player.ts"/>
import {Tick} from "./GameLoop";
import Player from "./Player";
import Redis from "./Redis";

interface PlayerObject {
    [key: string]: Player;
};

/**
 * The Core Class stores all data like the current tick, settings and instances of the Game.
 * Here we do not like to have imports and dependencies to other classes.
 */
class Core {
    private static instance: Core;
    private _currentTick: Tick;
    private _players: PlayerObject = {};
    private readonly _db: Redis;

    constructor() {
        this._db = new Redis(0);
        this._db.flushdb()
            .then(() => console.log('database cleared'))
            .catch((error) => { throw new Error(error); });
    }

    addPlayer(player: Player) {
        this._players[player.token] = player;
    }

    get currentTick(): Tick {
        return this._currentTick;
    }

    set currentTick(value: Tick) {
        this._currentTick = value;
    }

    get players(): object {
        return this._players;
    }

    get db(): Redis {
        return this._db;
    }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }
}

export default Core.Instance;
