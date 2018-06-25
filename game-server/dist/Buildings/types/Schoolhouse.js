"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EconomyBuilding_1 = __importDefault(require("../EconomyBuilding"));
const CostComponent_1 = __importDefault(require("../../Components/CostComponent"));
/**
 * The storehouse will store all Resources from the player.
 */
class Schoolhouse extends EconomyBuilding_1.default {
    constructor(position, alreadyBuilt = false) {
        super(position);
        this._maxGoldStore = 5;
        this._currentGoldStore = 0;
        this._cost = new CostComponent_1.default({
            timber: 6,
            stone: 5
        });
        this.build(alreadyBuilt);
    }
    getType() {
        return 'schoolhouse';
    }
    getBuildingData() {
        return {
            maxGoldStore: this._maxGoldStore,
            currentGoldStore: this._currentGoldStore
        };
    }
    get currentGoldStore() {
        return this._currentGoldStore;
    }
    set currentGoldStore(value) {
        this._currentGoldStore = value;
    }
}
exports.default = Schoolhouse;
//# sourceMappingURL=Schoolhouse.js.map