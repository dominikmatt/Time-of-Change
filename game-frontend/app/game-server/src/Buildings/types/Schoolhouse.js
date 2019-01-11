"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EconomyBuilding_1 = require("../EconomyBuilding");
const CostComponent_1 = require("../../Components/CostComponent");
const CharacterFactory_1 = require("../../Characters/CharacterFactory");
const gameSettings_1 = require("../../gameSettings");
const panel_1 = require("../../Panel/panel");
/**
 * The storehouse will store all Resources from the player.
 */
class Schoolhouse extends EconomyBuilding_1.default {
    constructor(player, position, alreadyBuilt = false) {
        super(player, position);
        this._maxGoldStore = 5;
        this._queue = [];
        this._matrix = [
            [1, 1, 1],
            [1, 2, 1]
        ];
        this._currentGoldStore = 0;
        this._runningQueue = null;
        this._cost = new CostComponent_1.default({
            timber: 6,
            stones: 5
        });
        this.build(alreadyBuilt);
    }
    getBuildingData() {
        return {
            maxGoldStore: this._maxGoldStore,
            currentGoldStore: this._currentGoldStore
        };
    }
    beforeUpdate() {
        this.updateQueue();
    }
    addToQueue(type) {
        this._queue.push(type);
        panel_1.default.update();
    }
    updateQueue() {
        if (0 === this._queue.length || null !== this._runningQueue) {
            return;
        }
        this._runningQueue = this._queue.pop();
        setTimeout(() => {
            this.player.addCharacter(CharacterFactory_1.default(this._runningQueue, this.id, this.player));
            this._runningQueue = null;
        }, 5000 / gameSettings_1.GAME_SPEED);
    }
    get currentGoldStore() {
        return this._currentGoldStore;
    }
    set currentGoldStore(value) {
        this._currentGoldStore = value;
    }
    get queue() {
        return this._queue;
    }
    get runningQueue() {
        return this._runningQueue;
    }
}
exports.default = Schoolhouse;
//# sourceMappingURL=Schoolhouse.js.map