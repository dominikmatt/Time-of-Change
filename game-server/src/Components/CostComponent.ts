interface CostInterface {
    timber: number;
    stones: number;
    gold: number;
    [key: string]: number
};

const healthMultiplicator = 50;

export default class CostComponent {
    private readonly _cost: CostInterface = {
        timber: 0,
        stones: 0,
        gold: 0
    };

    public constructor(cost: object = {}) {
        this._cost = Object.assign(this._cost, cost);
    }

    public getHealth(): number {
        const health = (this._cost.timber + this._cost.stones) * healthMultiplicator;

        return health;
    }

    get cost(): CostInterface {
        return this._cost;
    }
}
