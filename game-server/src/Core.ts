///<reference path="Player.ts"/>
import {Tick} from "./GameLoop";
import Player from "./Player";
import Redis from "./Redis";
import {GameStates} from "./enums/gameStates";
import {Environments} from "./enums/Environments";

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
    private _db: Redis;
    private _gameState: GameStates = GameStates.WaitingForPlayers;

    public async bootstrap() {
        this._db = new Redis();
        await this._db.connect(0);

;        this._db.flushdb()
          .then(() => console.log('database cleared'))
          .catch((error) => { throw new Error(error); });
        const player1redis = new Redis();
        await player1redis.connect(0)
        player1redis.flushdb()
          .then(() => console.log('database cleared player 1'))
          .catch((error) => { throw new Error(error); });
        const player2redis = new Redis();
        await player2redis.connect(1)
        player2redis.flushdb()
          .then(() => console.log('database cleared player 2'))
          .catch((error) => { throw new Error(error); });
    }

    addPlayer(player: Player) {
        this._players[player.token] = player;
    }

    public emitAll(event: string, value: any) {
        Object.keys(this._players).forEach((playerKey: string) => {
            const player: Player = this._players[playerKey];

            player.wsSocket.emit(event, value);
        });
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

    set gameState(gameState: GameStates) {
        this.emitAll('game.update', {
            gameState,
            playersCount: Object.keys(this.players).length,
        });

        this._gameState = gameState;
    }

    get gameState(): GameStates {
        return this._gameState;
    }
}

export default Core.Instance;
