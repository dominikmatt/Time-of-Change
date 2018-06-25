export interface PositionInterface {
    x: number;
    y: number;
    z: number;
    [key: string]: number
};

export class PositionComponent {
    private _position: PositionInterface = {
        x: 0,
        y: 0,
        z: 0
    };

    constructor(position: PositionInterface) {
        this._position = position;
    }

    get position(): PositionInterface {
        return this._position;
    }

    set position(value: PositionInterface) {
        this._position = value;
    }

    get x(): number {
        return this.position.x;
    }

    get y(): number {
        return this.position.y;
    }

    get z(): number {
        return this.position.z;
    }
}
