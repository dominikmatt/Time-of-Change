import EconomyBuilding from "../EconomyBuilding";
import BuildingInterface from "../BuildingInterface";
import CostComponent from "../../Components/CostComponent";
import {PositionInterface} from "../../Components/PositionComponent";
import Player from "../../Player";
import Field from "../../Field/Field";
import Sow from "../../Jobs/types/Sow";
import TransportToStorehouseJob from "../../Jobs/types/TransportToStorehouseJob";
import Harvest from "../../Jobs/types/Harvest";

export default class Farm extends EconomyBuilding implements BuildingInterface {
    readonly _maxFields: number = 20;
    private _fields: Field[] = [];
    readonly _matrix: number[][] = [
        [1,1,1,1],
        [1,1,1,1],
        [1,2,1,1],
    ];

    private readonly _maxCornStore: number = 5;
    private _currentCornStore: number = 0;

    constructor(player: Player, position: PositionInterface, alreadyBuilt: boolean = false) {
        super(player, position);

        this._cost = new CostComponent({
            timber: 4,
            stones: 3
        });

        this.build(alreadyBuilt);
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
        this.findField();

        if (
            null === this._nextJob &&
            null !== this._character
        ) {
            this.addNextJob();
        }
    }

    private addNextJob() {
        for(let field of this._fields) {
            if (true === field.isRaw()) {
                this._nextJob = new Sow(this._player, this._character, field);
                break;
            }
        }

        if (null !== this._nextJob) {
            return;
        }

        for(let field of this._fields) {
            if (true === field.isReadyToHarvest()) {
                this._nextJob = new Harvest(this._player, this._character, field);
                break;
            }
        }
    }

    public sowDone() {
        this._nextJob = null;
    }

    protected getBuildingData() {
        return {};
    }

    public update(delta: number) {
        super.update(delta);

        this._fields.forEach((field: Field) => {
           field.update(delta);
        });
    }

    public increaseStore() {
        this._currentCornStore++;
        this._nextJob = null;

        this._player.jobStore.addJob(
            new TransportToStorehouseJob(
                this._player,
                'corn',
                this
            )
        );
    }

    public decreaseStore(): Number {
        return this._currentCornStore--;
    }

    get currentCornStore(): number {
        return this._currentCornStore;
    }

    get fields(): Field[] {
        return this._fields;
    }
}