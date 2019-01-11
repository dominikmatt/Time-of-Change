"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EconomyBuilding_1 = require("../EconomyBuilding");
const CostComponent_1 = require("../../Components/CostComponent");
const ChopWood_1 = require("../../Jobs/types/ChopWood");
const Map_1 = require("../../Map/Map");
const TransportToStorehouseJob_1 = require("../../Jobs/types/TransportToStorehouseJob");
/**
 * The Woodcutters will take tree trunks from a tree.
 */
class Woodcutters extends EconomyBuilding_1.default {
    constructor(player, position, alreadyBuilt = false) {
        super(player, position);
        this._maxTreeTrunksStore = 5;
        this._matrix = [
            [1, 1, 1],
            [1, 2, 1]
        ];
        this._currentTreeTrunksStore = 0;
        this._cost = new CostComponent_1.default({
            timber: 3,
            stones: 2
        });
        this.build(alreadyBuilt);
        this.increaseStore();
    }
    getBuildingData() {
        return {
            maxTreeTrunksStore: this._maxTreeTrunksStore,
            currentTreeTrunksStore: this._currentTreeTrunksStore
        };
    }
    beforeUpdate() {
        this.addNextJob();
    }
    addNextJob() {
        if ((null !== this._nextJob || null === this._character)
            || this._currentTreeTrunksStore >= this._maxTreeTrunksStore) {
            return;
        }
        this._nextJob = new ChopWood_1.default(this._player, Map_1.default.findTree(this.doorPosition), this._character);
    }
    get currentTreeTrunksStore() {
        return this._currentTreeTrunksStore;
    }
    increaseStore() {
        this._currentTreeTrunksStore++;
        this._nextJob = null;
        this._player.jobStore.addJob(new TransportToStorehouseJob_1.default(this._player, 'treeTrunks', this));
    }
    decreaseStore() {
        return this._currentTreeTrunksStore--;
    }
}
exports.default = Woodcutters;
//# sourceMappingURL=Woodcutters.js.map