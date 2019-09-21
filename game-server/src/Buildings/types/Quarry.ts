import EconomyBuilding from "../EconomyBuilding";
import BuildingInterface from "../BuildingInterface";
import CostComponent from "../../Components/CostComponent";
import {PositionInterface} from "../../Components/PositionComponent";
import Player from "../../Player";
import ChopWood from "../../Jobs/types/ChopWood";
import Map from "../../Map/Map";
import TransportToStorehouseJob from "../../Jobs/types/TransportToStorehouseJob";
import ProductionBuildingInterface from "../ProductionBuildingInterface";

/**
 * The Quarry will take stone from a stone.
 */
export default class Quarry extends EconomyBuilding implements BuildingInterface, ProductionBuildingInterface {
    private readonly _maxStoneTrunksStore: number = 5;

    readonly _matrix: number[][] = [
        [1,1,1],
        [1,2,1]
    ];

    private _currentStonesStore: number = 0;

    constructor(player: Player, position: PositionInterface, alreadyBuilt: boolean = false) {
        super(player, position);

        this._cost = new CostComponent({
            timber: 2,
            stones: 2
        });

        this.build(alreadyBuilt);

        this.increaseStore();
    }

    protected getBuildingData() {
        return {
            maxStoneTrunksStore: this._maxStoneTrunksStore,
            currentStonesStore: this._currentStonesStore
        };
    }

    protected beforeUpdate() {
        this.addNextJob();
    }

    private addNextJob() {
        if ((null !== this._nextJob || null === this._character)
            || this._currentStonesStore >= this._maxStoneTrunksStore
        ) {
            return;
        }

        this._nextJob = new ChopWood(this._player, Map.findStone(this.doorPosition), this._character);
    }

    get currentStonesStore(): number {
        return this._currentStonesStore;
    }

    public increaseStore() {
        this._currentStonesStore++;
        this._nextJob = null;

        this._player.jobStore.addJob(
            new TransportToStorehouseJob(
                this._player,
                'stones',
                this
            )
        );
    }

    public decreaseStore(): Number {
        return this._currentStonesStore--;
    }
}
