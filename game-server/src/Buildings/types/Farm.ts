import EconomyBuilding from "../EconomyBuilding";
import BuildingInterface from "../BuildingInterface";
import CostComponent from "../../Components/CostComponent";
import {PositionInterface} from "../../Components/PositionComponent";
import Player from "../../Player";
import Field from "../../Field/Field";

export default class Farm extends EconomyBuilding implements BuildingInterface {
    readonly _maxFields: number = 5;
    private _fields: Field[] = [];
    readonly _matrix: number[][] = [
        [1,1,1,1],
        [1,1,1,1],
        [1,2,1,1],
    ];

    constructor(player: Player, position: PositionInterface, alreadyBuilt: boolean = false) {
        super(player, position);

        this._cost = new CostComponent({
            timber: 6,
            stones: 5
        });

        this.build(alreadyBuilt);

        this.findField();
    }

    protected findField() {
        if (true === this.completelyBuilt && this._maxFields > this._fields.length) {
            const nearestFields = this._player.getNearestFreeFields(this.position.position);

            if (0 < nearestFields.length) {
                const field = nearestFields.shift();
                field.building = this;
                this._fields.push(field);
            }
        }
    }

    protected beforeUpdate() {
    }

    protected getBuildingData() {
        return {};
    }
}