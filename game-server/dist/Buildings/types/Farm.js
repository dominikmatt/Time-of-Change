"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EconomyBuilding_1 = __importDefault(require("../EconomyBuilding"));
const CostComponent_1 = __importDefault(require("../../Components/CostComponent"));
class Farm extends EconomyBuilding_1.default {
    constructor(player, position, alreadyBuilt = false) {
        super(player, position);
        this._maxFields = 5;
        this._fields = [];
        this._matrix = [
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 2, 1, 1],
        ];
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
    }
    getBuildingData() {
        return {};
    }
}
exports.default = Farm;
//# sourceMappingURL=Farm.js.map