import core from "./Core";
import {GAME_SPEED, TICK_LENGTH_MS} from "./gameSettings";
import Player from "./Player";

/**
 * The Tick-Class has all data of the current Tick.
 * It will be created from the game-loop.
 */
export class Tick {
    private _delta: number;

    private readonly _ticks: number;

    constructor(index: number) {
        this._ticks = index;
    }

    get delta(): number {
        return this._delta;
    }

    set delta(value: number) {
        this._delta = value;
    }
}

/**
 * The GameLoop class will handle the update speed and will calls himself up.
 */
export default class GameLoop {
    /**
     * Timestamp
     */
    private now: number;

    /**
     * Timestamp
     */
    private previousTick: number;

    /**
     * Count of the ticks between two ticks.
     * Is like FPS.
     */
    private actualTicks: number;

    constructor() {
        this.actualTicks = 0;
        this.previousTick = Date.now();
    }

    /**
     * Start loop when game is ready.
     */
    public startLoop() {
        this.loop();
    }

    /**
     * Checks the time between two calls. If delta is greater then 1 the server has some performance issues.
     * With the delta value we are able to calculate the the speed from characters.
     *
     * This method will call the update-method from all players.
     * The next step is that the player update method will call the update-method from towns.
     * Town update-method will call the Characters, Jobs, Building,… updated-method.
     */
    private loop() {
        this.now = Date.now();
        this.actualTicks++;

        // Check if the needed time between two tick is reached.
        if (this.previousTick + TICK_LENGTH_MS <= this.now) {
            // Delta is like the time 0.05 === 50ms, 1.00 === 1s,…
            const delta = (this.now - this.previousTick) / 1000;
            const tick = new Tick(this.actualTicks);

            tick.delta = delta;

            core.currentTick = tick;

            this.previousTick = this.now;

            this.update();

            this.actualTicks = 0;
        }

        if (Date.now() - this.previousTick < TICK_LENGTH_MS - 16) {
            setTimeout(this.loop.bind(this));
        } else {
            setImmediate(this.loop.bind(this));
        }
    }

    /**
     * Called by the loop every 50ms. If the server has some performance issues the time between calls will be increased.
     */
    private update() {
        (<any>Object).values(core.players).forEach((player: Player) => {
            player.update();
        });
    }
};