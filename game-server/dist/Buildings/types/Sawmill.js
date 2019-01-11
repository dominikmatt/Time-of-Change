"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EconomyBuilding_1 = __importDefault(require("../EconomyBuilding"));
const CostComponent_1 = __importDefault(require("../../Components/CostComponent"));
const TransportToStorehouseJob_1 = __importDefault(require("../../Jobs/types/TransportToStorehouseJob"));
const Woodworking_1 = __importDefault(require("../../Jobs/types/Woodworking"));
class Sawmill extends EconomyBuilding_1.default {
    constructor(player, position, alreadyBuilt = false) {
        super(player, position);
        this._maxTreeTrunksStore = 5;
        this._maxTimberStore = 5;
        this._currentTreeTrunksStore = 0;
        this._currentTimberStore = 0;
        this._matrix = [
            [1, 1, 1],
            [1, 2, 1],
        ];
        this._cost = new CostComponent_1.default({
            timber: 4,
            stones: 3
        });
        this.build(alreadyBuilt);
        this.increaseTreeTrunkStore();
    }
    getBuildingData() {
        return {};
    }
    beforeUpdate() {
        this.addNextJob();
    }
    addNextJob() {
        if ((null !== this._nextJob || null === this._character)
            || this._currentTimberStore >= this._maxTimberStore
            || 0 === this._currentTreeTrunksStore) {
            return;
        }
        this._nextJob = new Woodworking_1.default(this._player, this._character);
    }
    increaseTreeTrunkStore() {
        this._currentTreeTrunksStore++;
    }
    decreaseTreeTrunkStore() {
        this._currentTreeTrunksStore--;
    }
    increaseStore() {
        this._currentTimberStore++;
        this._player.jobStore.addJob(new TransportToStorehouseJob_1.default(this._player, 'timber', this));
    }
    decreaseStore() {
        return this._currentTimberStore--;
    }
    get currentTreeTrunksStore() {
        return this._currentTreeTrunksStore;
    }
    get currentTimberStore() {
        return this._currentTimberStore;
    }
}
exports.default = Sawmill;
//# sourceMappingURL=Sawmill.js.map