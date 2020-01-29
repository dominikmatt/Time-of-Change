"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EconomyBuilding_1 = __importDefault(require("../EconomyBuilding"));
const CostComponent_1 = __importDefault(require("../../Components/CostComponent"));
const ChopWood_1 = __importDefault(require("../../Jobs/types/ChopWood"));
const Map_1 = __importDefault(require("../../Map/Map"));
const TransportToStorehouseJob_1 = __importDefault(require("../../Jobs/types/TransportToStorehouseJob"));
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
            timber: 2,
            stones: 2
        });
        this.build(alreadyBuilt);
        this.increaseStore();
    }
    getBuildingData() {
        return {
            maxStoneTrunksStore: this._maxTreeTrunksStore,
            currentStonesStore: this._currentTreeTrunksStore
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