import EconomyBuilding from "../EconomyBuilding";
import BuildingInterface from "../BuildingInterface";
import CostComponent from "../../Components/CostComponent";
import {PositionInterface} from "../../Components/PositionComponent";
import Player from "../../Player";
import TransportToStorehouseJob from "../../Jobs/types/TransportToStorehouseJob";
import ChopWood from "../../Jobs/types/ChopWood";
import Map from "../../Map/Map";
import Woodworking from "../../Jobs/types/Woodworking";
import ProductionBuildingInterface from "../ProductionBuildingInterface";

export default class Sawmill extends EconomyBuilding implements ProductionBuildingInterface {
    private readonly _maxTreeTrunksStore: number = 5;
    private readonly _maxTimberStore: number = 5;
    private _currentTreeTrunksStore: number = 0;
    private _currentTimberStore: number = 0;

    readonly _matrix: number[][] = [
        [1,1,1],
        [1,2,1],
    ];

    constructor(player: Player, position: PositionInterface, alreadyBuilt: boolean = false) {
        super(player, position);

        this._cost = new CostComponent({
            timber: 4,
            stones: 3
        });

        this.build(alreadyBuilt);
        this.increaseTreeTrunkStore();
    }

    protected getBuildingData() {
        return {};
    }

    protected beforeUpdate() {
        this.addNextJob();
    }

    private addNextJob() {
        if (
            (null !== this._nextJob || null === this._character)
            || this._currentTimberStore >= this._maxTimberStore
            || 0 === this._currentTreeTrunksStore
        ) {
            return;
        }

        this._nextJob = new Woodworking(this._player, this._character);
    }

    public increaseTreeTrunkStore() {
        this._currentTreeTrunksStore++;
    }

    public decreaseTreeTrunkStore() {
        this._currentTreeTrunksStore--;
    }

    public increaseStore() {
        this._currentTimberStore++;

        this._player.jobStore.addJob(
            new TransportToStorehouseJob(
                this._player,
                'timber',
                this
            )
        );
    }

    public decreaseStore(): number {
        return this._currentTimberStore--;
    }

    get currentTreeTrunksStore(): number {
        return this._currentTreeTrunksStore;
    }

    get currentTimberStore(): number {
        return this._currentTimberStore;
    }
}