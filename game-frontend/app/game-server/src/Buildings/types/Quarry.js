"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EconomyBuilding_1 = require("../EconomyBuilding");
const CostComponent_1 = require("../../Components/CostComponent");
const ChopWood_1 = require("../../Jobs/types/ChopWood");
const Map_1 = require("../../Map/Map");
const TransportToStorehouseJob_1 = require("../../Jobs/types/TransportToStorehouseJob");
/**
 * The Quarry will take stone from a stone.
 */
class Quarry extends EconomyBuilding_1.default {
    constructor(player, position, alreadyBuilt = false) {
        super(player, position);
        this._maxStoneTrunksStore = 5;
        this._matrix = [
            [1, 1, 1],
            [1, 2, 1]
        ];
        this._currentStonesStore = 0;
        this._cost = new CostComponent_1.default({
            timber: 3,
            stones: 2
        });
        this.build(alreadyBuilt);
        this.increaseStore();
    }
    getBuildingData() {
        return {
            maxStoneTrunksStore: this._maxStoneTrunksStore,
            currentStonesStore: this._currentStonesStore
        };
    }
    beforeUpdate() {
        this.addNextJob();
    }
    addNextJob() {
        if ((null !== this._nextJob || null === this._character)
            || this._currentStonesStore >= this._maxStoneTrunksStore) {
            return;
        }
        this._nextJob = new ChopWood_1.default(this._player, Map_1.default.findStone(this.doorPosition), this._character);
    }
    get currentStonesStore() {
        return this._currentStonesStore;
    }
    increaseStore() {
        this._currentStonesStore++;
        this._nextJob = null;
        this._player.jobStore.addJob(new TransportToStorehouseJob_1.default(this._player, 'stones', this));
    }
    decreaseStore() {
        return this._currentStonesStore--;
    }
}
exports.default = Quarry;
//# sourceMappingURL=Quarry.js.map