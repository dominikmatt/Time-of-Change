"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Core_1 = __importDefault(require("./Core"));
const gameSettings_1 = require("./gameSettings");
const gameStates_1 = require("./enums/gameStates");
/**
 * The Tick-Class has all data of the current Tick.
 * It will be created from the game-loop.
 */
class Tick {
    constructor(index) {
        this._ticks = index;
    }
    get delta() {
        return this._delta;
    }
    set delta(value) {
        this._delta = value;
    }
}
exports.Tick = Tick;
/**
 * The GameLoop class will handle the update speed and will calls himself up.
 */
class GameLoop {
    constructor() {
        this.actualTicks = 0;
        this.previousTick = Date.now();
    }
    /**
     * Start loop when game is ready.
     */
    startLoop() {
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
    loop() {
        if (gameStates_1.GameStates.Started !== Core_1.default.gameState) {
            this.previousTick = Date.now();
        }
        this.now = Date.now();
        this.actualTicks++;
        // Check if the needed time between two tick is reached.
        if (this.previousTick + gameSettings_1.TICK_LENGTH_MS <= this.now) {
            // Delta is like the time 0.05 === 50ms, 1.00 === 1s,…
            const delta = (this.now - this.previousTick) / 1000;
            const tick = new Tick(this.actualTicks);
            tick.delta = delta;
            Core_1.default.currentTick = tick;
            this.previousTick = this.now;
            this.update(delta);
            this.actualTicks = 0;
        }
        if (Date.now() - this.previousTick < gameSettings_1.TICK_LENGTH_MS - 16) {
            setTimeout(this.loop.bind(this));
        }
        else {
            setImmediate(this.loop.bind(this));
        }
    }
    /**
     * Called by the loop every 50ms. If the server has some performance issues the time between calls will be increased.
     */
    update(delta) {
        Object.values(Core_1.default.players).forEach((player) => {
            player.update(delta);
        });
    }
}
exports.default = GameLoop;
;
//# sourceMappingURL=GameLoop.js.map