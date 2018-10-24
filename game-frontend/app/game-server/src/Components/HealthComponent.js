"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HealthComponent {
    constructor(maxhealth, currentHealth = 0) {
        this._maxHealth = 0;
        this._currentHealth = 0;
        this._maxHealth = maxhealth;
        this._currentHealth = currentHealth;
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