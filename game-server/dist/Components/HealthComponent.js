"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HealthComponent {
    constructor(character, maxhealth = 100, currentHealth = 100) {
        this._maxHealth = 100;
        this._currentHealth = 0;
        this._character = character;
        this._maxHealth = maxhealth;
        this._currentHealth = currentHealth;
    }
    decreaseHealt(toDecreaseHealt) {
        this._currentHealth -= toDecreaseHealt;
        if (0 >= this._currentHealth) {
            this._character.destroy();
        }
    }
    increaseHealt(toIncreaseHealt) {
        this._currentHealth += toIncreaseHealt;
        if (100 < this._currentHealth) {
            this._currentHealth = 100;
        }
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