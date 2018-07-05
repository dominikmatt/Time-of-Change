"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
const healthMultiplicator = 50;
class CostComponent {
    constructor(cost = {}) {
        this._cost = {
            timber: 0,
            stones: 0,
            gold: 0
        };
        this._cost = Object.assign(this._cost, cost);
    }
    getHealth() {
        const health = (this._cost.timber + this._cost.stones) * healthMultiplicator;
        return health;
    }
    get cost() {
        return this._cost;
    }
}
exports.default = CostComponent;
//# sourceMappingURL=CostComponent.js.map