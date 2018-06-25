///<reference path="Player.ts"/>
import {Tick} from "./GameLoop";
import Player from "./Player";

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

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }
}

export default Core.Instance;
