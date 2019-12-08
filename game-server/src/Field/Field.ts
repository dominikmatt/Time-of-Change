import IAddField from "../Interfaces/AddField";
import {v1 as uuidv1} from "uuid";
import Player from "../Player";
import {PositionComponent} from "../Components/PositionComponent";
import Building from "../Buildings/Building";
import Map from "../Map/Map";

export default class Field {
    protected _id: string =  uuidv1();

    protected readonly _player: Player;
    private _position: PositionComponent;
    private _building?: Building = null;

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
}