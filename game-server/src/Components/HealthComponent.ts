import DestroyAbleInterface from "./DestroyAbleInterface";

export default class HealthComponent<T extends DestroyAbleInterface> {
    private readonly _maxHealth: number = 100;
    private _currentHealth: number = 0;
    private _character: T;

    constructor(character: T, maxhealth: number = 100, currentHealth: number = 100) {
        this._character = character;
        this._maxHealth = maxhealth;
        this._currentHealth = currentHealth;
    }

    public decreaseHealt(toDecreaseHealt: number): void {
        this._currentHealth -= toDecreaseHealt;

        if (0 >= this._currentHealth) {
            this._character.destroy();
        }
    }

    public increaseHealt(toIncreaseHealt: number): void {
        this._currentHealth += toIncreaseHealt;

        if (100 < this._currentHealth) {
            this._currentHealth = 100;
        }
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
