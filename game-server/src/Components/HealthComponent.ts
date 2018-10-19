export default class HealthComponent {
    private readonly _maxHealth: number = 0;
    private _currentHealth: number = 0;

    constructor(maxhealth: number, currentHealth: number = 0) {
        this._maxHealth = maxhealth;
        this._currentHealth = currentHealth;
    }

    get maxHealth(): number {
        return this._maxHealth;
    }

    get currentHealth(): number {
        return this._currentHealth;
    }

    set currentHealth(value: number) {
        this._currentHealth = value;
    }
}
