"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EconomyBuilding_1 = __importDefault(require("../EconomyBuilding"));
const CostComponent_1 = __importDefault(require("../../Components/CostComponent"));
const TransportToStorehouseJob_1 = __importDefault(require("../../Jobs/types/TransportToStorehouseJob"));
const Woodworking_1 = __importDefault(require("../../Jobs/types/Woodworking"));
const TransportJob_1 = __importDefault(require("../../Jobs/types/TransportJob"));
class Sawmill extends EconomyBuilding_1.default {
    constructor(player, position, alreadyBuilt = false) {
        super(player, position);
        this._maxTreeTrunksStore = 5;
        this._maxTimberStore = 5;
        this._currentTreeTrunksStore = 0;
        this._currentTimberStore = 0;
        this._resources = {
            timber: 0,
            treeTrunks: 0,
        };
        this._matrix = [
            [1, 1, 1],
            [1, 1, 2],
        ];
        this._treeTrunksTransportJobsCount = 0;
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
        // Add transport job.
        if (this._resources.treeTrunks + this._treeTrunksTransportJobsCount < this._maxTreeTrunksStore) {
            this._treeTrunksTransportJobsCount++;
            this._player.jobStore.addJob(new TransportJob_1.default(this._player, this.doorPosition, 'treeTrunks', this));
        }
        // Add working job.
        if (null === this._nextJob
            && null !== this._character
            && this._resources.timber < this._maxTimberStore
            && 0 < this._resources.treeTrunks) {
            this._nextJob = new Woodworking_1.default(this._player, this._character);
        }
    }
    increaseTreeTrunkStore() {
        this._resources.treeTrunks++;
        this._treeTrunksTransportJobsCount--;
        if (0 > this._treeTrunksTransportJobsCount) {
            this._treeTrunksTransportJobsCount = 0;
        }
    }
    addResource(type) {
        this.increaseTreeTrunkStore();
    }
    decreaseTreeTrunkStore() {
        this._resources.treeTrunks--;
    }
    increaseStore() {
        this._resources.timber++;
        this._nextJob = null;
        this._player.jobStore.addJob(new TransportToStorehouseJob_1.default(this._player, 'timber', this));
    }
    decreaseStore() {
        return this._resources.timber--;
    }
    get currentTreeTrunksStore() {
        return this._resources.treeTrunks;
    }
    get currentTimberStore() {
        return this._resources.timber;
    }
}
exports.default = Sawmill;
//# sourceMappingURL=Sawmill.js.map