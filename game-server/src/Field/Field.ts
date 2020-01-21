import IAddField from "../Interfaces/AddField";
import {v1 as uuidv1} from "uuid";
import Player from "../Player";
import {PositionComponent} from "../Components/PositionComponent";
import Building from "../Buildings/Building";
import Map from "../Map/Map";

enum FieldStates {
    RAW = 1,
    GROWING = 2,
    MATURE = 3,
}

export default class Field {
    private _id: string =  uuidv1();

    protected readonly _player: Player;
    private _position: PositionComponent;
    private _building?: Building = null;
    private _status: FieldStates = FieldStates.RAW; // In percent.
    private _progress: number = 0; // In percent.

    constructor(fieldData: IAddField, player: Player, ) {
        this._position = new PositionComponent(fieldData.position);

        this.updateMap();
    }

    protected updateMap() {
        Map.updateCoordinate(this._position.x, this._position.z, {
            runnable: false,
            building: null,
            hasField: true,
            hasTree: false,
            hasStone: false,
        });
    }

    public isRaw() {
        return FieldStates.RAW === this._status;
    }

    public isReadyToHarvest() {
        return FieldStates.MATURE === this._status;
    }

    public sow() {
        if (FieldStates.RAW === this._status) {
            this._status = FieldStates.GROWING;

            return true
        }

        return false
    }

    public harvest() {
        if (FieldStates.MATURE === this._status) {
            this._status = FieldStates.RAW;
            this._progress = 0;

            return true
        }

        return false
    }

    public update(delta: number) {
        if (FieldStates.GROWING === this._status) {
            this._progress += delta;
        }

        if (100 <= this._progress) {
            this._status = FieldStates.MATURE;
        }
    }

    get id(): string {
        return this._id;
    }

    get building(): Building {
        return this._building;
    }

    set building(value: Building) {
        this._building = value;
    }

    get position(): PositionComponent {
        return this._position;
    }

    set position(value: PositionComponent) {
        this._position = value;
    }

    get progress(): number {
        return this._progress;
    }

    get status(): FieldStates {
        return this._status;
    }

    public toObject() {
        return {
            _id: this._id,
            status: this._status,
            progress: this._progress,
            player: this._player.token,
            position: this._position.position,
        };
    }
}