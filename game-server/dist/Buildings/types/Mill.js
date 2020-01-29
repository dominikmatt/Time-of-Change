"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EconomyBuilding_1 = __importDefault(require("../EconomyBuilding"));
const CostComponent_1 = __importDefault(require("../../Components/CostComponent"));
const TransportJob_1 = __importDefault(require("../../Jobs/types/TransportJob"));
const TransportToStorehouseJob_1 = __importDefault(require("../../Jobs/types/TransportToStorehouseJob"));
const Grind_1 = __importDefault(require("../../Jobs/types/Grind"));
class Mill extends EconomyBuilding_1.default {
    constructor(player, position, alreadyBuilt = false) {
        super(player, position);
        this._matrix = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 2, 1],
        ];
        this._resources = {
            corn: {
                value: 0,
                max: 5,
                jobs: 0,
            },
            flour: {
                value: 0,
                max: 5,
                jobs: 0,
            },
        };
        this._cost = new CostComponent_1.default({
            timber: 4,
            stones: 3
        });
        this.build(alreadyBuilt);
    }
    getBuildingData() {
        return {};
    }
    beforeUpdate() {
        this.addNextJob();
    }
    addNextJob() {
        // Add transport job.
        if (this._resources.corn.value + this._resources.corn.jobs < this._resources.corn.max) {
            this._resources.corn.jobs++;
            this._player.jobStore.addJob(new TransportJob_1.default(this._player, this.doorPosition, 'corn', this));
        }
        // Add working job.
        if (null === this._nextJob
            && null !== this._character
            && this._resources.flour.value < this._resources.flour.max
            && 0 < this._resources.corn.value) {
            this._nextJob = new Grind_1.default(this._player, this._character);
        }
    }
    afterResourceAdded(type) {
        if ('corn' === type) {
            this._resources.corn.jobs--;
        }
    }
    decreaseCornStore() {
        this._resources.corn.value--;
    }
    increaseFlourStore() {
        this._resources.flour.value++;
        this._nextJob = null;
        this._player.jobStore.addJob(new TransportToStorehouseJob_1.default(this._player, 'timber', this));
    }
    decreaseStore() {
        return this._resources.flour.value--;
    }
}
exports.default = Mill;
//# sourceMappingURL=Mill.js.map