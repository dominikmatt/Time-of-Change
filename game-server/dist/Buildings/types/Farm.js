"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EconomyBuilding_1 = __importDefault(require("../EconomyBuilding"));
const CostComponent_1 = __importDefault(require("../../Components/CostComponent"));
const Sow_1 = __importDefault(require("../../Jobs/types/Sow"));
const TransportToStorehouseJob_1 = __importDefault(require("../../Jobs/types/TransportToStorehouseJob"));
const Harvest_1 = __importDefault(require("../../Jobs/types/Harvest"));
class Farm extends EconomyBuilding_1.default {
    constructor(player, position, alreadyBuilt = false) {
        super(player, position);
        this._maxFields = 5;
        this._fields = [];
        this._matrix = [
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [2, 2, 1, 1],
        ];
        this._maxCornStore = 5;
        this._currentCornStore = 0;
        this._cost = new CostComponent_1.default({
            timber: 6,
            stones: 5
        });
        this.build(alreadyBuilt);
    }
    findField() {
        if (true === this.completelyBuilt && this._maxFields > this._fields.length) {
            const nearestFields = this._player.getNearestFreeFields(this.position.position);
            if (0 < nearestFields.length) {
                const field = nearestFields.shift();
                field.building = this;
                this._fields.push(field);
            }
        }
    }
    beforeUpdate() {
        this.findField();
        this.addNextJob();
    }
    addNextJob() {
        if ((null !== this._nextJob || null === this._character)) {
            return;
        }
        for (let field of this._fields) {
            if (true === field.isRaw()) {
                this._nextJob = new Sow_1.default(this._player, this._character, field);
                break;
            }
        }
        if (null !== this._nextJob) {
            return;
        }
        for (let field of this._fields) {
            if (true === field.isReadyToHarvest()) {
                this._nextJob = new Harvest_1.default(this._player, this._character, field);
                break;
            }
        }
    }
    sowDone() {
        this._nextJob = null;
    }
    getBuildingData() {
        return {};
    }
    update(delta) {
        super.update(delta);
        this._fields.forEach((field) => {
            field.update(delta);
        });
    }
    increaseStore() {
        this._currentCornStore++;
        this._nextJob = null;
        this._player.jobStore.addJob(new TransportToStorehouseJob_1.default(this._player, 'corn', this));
    }
    decreaseStore() {
        return this._currentCornStore--;
    }
    get currentCornStore() {
        return this._currentCornStore;
    }
    get fields() {
        return this._fields;
    }
}
exports.default = Farm;
//# sourceMappingURL=Farm.js.map