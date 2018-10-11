"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HealthComponent {
    constructor(maxhealt, currentHealt = 0) {
        this._maxHealth = 0;
        this._currentHealth = 0;
        this._maxHealth = maxhealt;
        this._currentHealth = currentHealt;
    }
    get maxHealth() {
        return this._maxHealth;
    }
    get currentHealth() {
        return this._currentHealth;
    }
    set currentHealth(value) {
        this._currentHealth = value;
    }
}
exports.default = HealthComponent;
//# sourceMappingURL=HealthComponent.js.map