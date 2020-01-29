import EconomyBuilding from "../EconomyBuilding";
import CostComponent from "../../Components/CostComponent";
import {PositionInterface} from "../../Components/PositionComponent";
import Player from "../../Player";
import TransportJob from "../../Jobs/types/TransportJob";
import Woodworking from "../../Jobs/types/Woodworking";
import TransportToStorehouseJob from "../../Jobs/types/TransportToStorehouseJob";
import ProductionBuildingInterface from "../ProductionBuildingInterface";
import Grind from "../../Jobs/types/Grind";

export default class Mill extends EconomyBuilding implements ProductionBuildingInterface {
    readonly _matrix: number[][] = [
        [1,1,1],
        [1,1,1],
        [1,2,1],
    ];

    protected _resources: {
        corn: {
            value: number,
            max: number,
            jobs: number,
        },
        flour: {
            value: number,
            max: number,
            jobs: number,
        },
    };

    constructor(player: Player, position: PositionInterface, alreadyBuilt: boolean = false) {
        super(player, position);

        this._resources = {
            corn: {
                value: 0,
                max: 5,
                jobs: 0,
            },
            flour: {
                value: 0,
                max: 5,
                jobs: 0,
            },
        };

        this._cost = new CostComponent({
            timber: 4,
            stones: 3
        });

        this.build(alreadyBuilt);
    }

    protected getBuildingData() {
        return {};
    }

    protected beforeUpdate() {
        this.addNextJob();
    }

    private addNextJob() {
        // Add transport job.
        if (this._resources.corn.value + this._resources.corn.jobs < this._resources.corn.max) {
            this._resources.corn.jobs++;

            this._player.jobStore.addJob(
                new TransportJob(
                    this._player,
                    this.doorPosition,
                    'corn',
                    this
                )
            );
        }


        // Add working job.
        if (null === this._nextJob
            && null !== this._character
            && this._resources.flour.value < this._resources.flour.max
            && 0 < this._resources.corn.value
        ) {
            this._nextJob = new Grind(this._player, this._character);
        }
    }

    protected afterResourceAdded(type: string) {
        if ('corn' === type) {
            this._resources.corn.jobs--;
        }
    }

    public decreaseCornStore() {
        this._resources.corn.value--;
    }

    public increaseFlourStore() {
        this._resources.flour.value++;
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
        return this._resources.flour.value--;
    }
}