"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EconomyBuilding_1 = require("../EconomyBuilding");
const CostComponent_1 = require("../../Components/CostComponent");
/**
 * The Woodkutters will take tree trunks from a tree.
 */
class Woodkutters extends EconomyBuilding_1.default {
    constructor(player, position, alreadyBuilt = false) {
        super(player, position);
        this._maxTreeTrunksStore = 5;
        this._queue = [];
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
    }
    getType() {
        return 'woodkutters';
    }
    getBuildingData() {
        return {
            maxTreeTrunksStore: this._maxTreeTrunksStore,
            currentTreeTrunksStore: this._currentTreeTrunksStore
        };
    }
    beforeUpdate() { }
}
exports.default = Woodkutters;
//# sourceMappingURL=Woodkutters.js.map