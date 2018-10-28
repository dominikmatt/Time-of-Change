import EconomyBuilding from "../EconomyBuilding";
import BuildingInterface from "../BuildingInterface";
import CostComponent from "../../Components/CostComponent";
import {PositionInterface} from "../../Components/PositionComponent";
import Player from "../../Player";
import ChopWood from "../../Jobs/types/ChopWood";
import Map from "../../Map/Map";
import TransportJob from "../../Jobs/types/TransportJob";
import TransportToStorehouseJob from "../../Jobs/types/TransportToStorehouseJob";
import ProductionBuildingInterface from "../ProductionBuildingInterface";

/**
 * The Woodkutters will take tree trunks from a tree.
 */
export default class Woodkutters extends EconomyBuilding implements BuildingInterface, ProductionBuildingInterface {
    private readonly _maxTreeTrunksStore: number = 5;

    readonly _matrix: number[][] = [
        [1,1,1],
        [1,2,1]
    ];

    private _currentTreeTrunksStore: number = 0;

    constructor(player: Player, position: PositionInterface, alreadyBuilt: boolean = false) {
        super(player, position);

        this._cost = new CostComponent({
            timber: 3,
            stones: 2
        });

        this.build(alreadyBuilt);

        this.increaseStore();
    }

    public getType() {
        return 'woodkutters';
    }

    protected getBuildingData() {
        return {
            maxTreeTrunksStore: this._maxTreeTrunksStore,
            currentTreeTrunksStore: this._currentTreeTrunksStore
        };
    }

    protected beforeUpdate() {
        this.addNextJob();
    }

    private addNextJob() {
        if ((null !== this._nextJob || null === this._character)
            || this._currentTreeTrunksStore >= this._maxTreeTrunksStore
        ) {
            return;
        }

        this._nextJob = new ChopWood(this._player, Map.findTree(), this._character);
    }

    get currentTreeTrunksStore(): number {
        return this._currentTreeTrunksStore;
    }

    public increaseStore() {
        this._currentTreeTrunksStore++;
        this._nextJob = null;

        this._player.jobStore.addJob(
                new TransportToStorehouseJob(
                this._player,
                'treeTrunks',
                this
            )
        );

    }

    public decreaseStore() {
        this._currentTreeTrunksStore--;
    }
}
