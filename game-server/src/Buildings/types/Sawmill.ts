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
import TransportToBuildingJob from "../../Jobs/types/TransportToBuildingJob";
import TransportJob from "../../Jobs/types/TransportJob";

interface ResourceInterface {
    timber?: number;
    treeTrunks?: number;
}

export default class Sawmill extends EconomyBuilding implements ProductionBuildingInterface {
    private readonly _maxTreeTrunksStore: number = 5;
    private readonly _maxTimberStore: number = 5;
    private _currentTreeTrunksStore: number = 0;
    private _currentTimberStore: number = 0;

    protected _resources: ResourceInterface = {
        timber: 0,
        treeTrunks: 0,
    };

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
        // Add transport job.
        if (this._resources.treeTrunks < this._maxTreeTrunksStore
        ) {
            this._player.jobStore.addJob(
                new TransportJob(
                    this._player,
                    this.doorPosition,
                    'treeTrunks',
                    this
                )
            );
        }


        // Add working job.
        if (null === this._nextJob
            && null !== this._character
            && this._resources.timber < this._maxTimberStore
            && 0 < this._resources.treeTrunks
        ) {

            this._nextJob = new Woodworking(this._player, this._character);
        }

    }

    public increaseTreeTrunkStore() {
        this._resources.treeTrunks++;
    }

    public decreaseTreeTrunkStore() {
        this._resources.treeTrunks--;
    }

    public increaseStore() {
        this._resources.timber++;
        this._nextJob = null;

        this._player.jobStore.addJob(
            new TransportToStorehouseJob(
                this._player,
                'timber',
                this
            )
        );
    }

    public decreaseStore(): number {
        return this._resources.timber--;
    }

    get currentTreeTrunksStore(): number {
        return this._resources.treeTrunks;
    }

    get currentTimberStore(): number {
        return this._resources.timber;
    }
}