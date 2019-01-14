"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EconomyBuilding_1 = require("../EconomyBuilding");
const CostComponent_1 = require("../../Components/CostComponent");
class Sawmill extends EconomyBuilding_1.default {
    constructor(player, position, alreadyBuilt = false) {
        super(player, position);
        this._matrix = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 2, 1],
        ];
        this._cost = new CostComponent_1.default({
            timber: 6,
            stones: 5
        });
        this.build(alreadyBuilt);
    }
    getType() {
        return 'storehouse';
    }
    getBuildingData() {
        return {};
    }
}
exports.default = Sawmill;
//# sourceMappingURL=Sawmill.js.map