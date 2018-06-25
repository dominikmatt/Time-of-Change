export default class HealthComponent {
    private readonly _maxHealth: number = 0;
    private _currentHealth: number = 0;

    constructor(maxhealt: number, currentHealt: number = 0) {
        this._maxHealth = maxhealt;
        this._currentHealth = currentHealt;
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
