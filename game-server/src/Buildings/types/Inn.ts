import EconomyBuilding from "../EconomyBuilding";
import BuildingInterface from "../BuildingInterface";
import CostComponent from "../../Components/CostComponent";
import {PositionInterface} from "../../Components/PositionComponent";
import Player from "../../Player";
import TransportJob from "../../Jobs/types/TransportJob";
import Woodworking from "../../Jobs/types/Woodworking";

interface ResourceInterface {
    sausages: number;
    beer: number;
    loaves: number;
    [key: string]: number;
}

export default class Inn extends EconomyBuilding implements BuildingInterface {
    readonly _matrix: number[][] = [
        [1,1,1,1],
        [1,1,1,1],
        [1,2,1,1],
    ];

    private readonly _maxFoodStore: number = 5;
    protected _currentTransportJobs: ResourceInterface = {
        sausages: 0,
        beer: 0,
        loaves: 0,
    };

    protected _resources: ResourceInterface = {
        sausages: 0,
        beer: 0,
        loaves: 0,
    };

    constructor(player: Player, position: PositionInterface, alreadyBuilt: boolean = false) {
        super(player, position);

        this._cost = new CostComponent({
            timber: 6,
            stones: 5
        });

        this.build(alreadyBuilt);
    }

    protected beforeUpdate() {
        this.addNextJob();
    }

    private addNextJob() {
        // Add sausage transport job.
        if (this._resources.sausages + this._currentTransportJobs.sausages < this._maxFoodStore
        ) {
            this._currentTransportJobs.sausages++;
            this._player.jobStore.addJob(
                new TransportJob(
                    this._player,
                    this.doorPosition,
                    'sausages',
                    this
                )
            );
        }

        // Add loaves transport job.
         if (this._resources.loaves + this._currentTransportJobs.loaves < this._maxFoodStore
        ) {
            this._currentTransportJobs.loaves++;
            this._player.jobStore.addJob(
                new TransportJob(
                    this._player,
                    this.doorPosition,
                    'loaves',
                    this
                )
            );
        }

        // Add beer transport job.
        if (this._resources.beer + this._currentTransportJobs.beer < this._maxFoodStore
        ) {
            this._currentTransportJobs.beer++;
            this._player.jobStore.addJob(
                new TransportJob(
                    this._player,
                    this.doorPosition,
                    'beer',
                    this
                )
            );
        }
    }

    protected afterResourceAdded(type: string) {
        super.afterResourceAdded(type);


        this._currentTransportJobs[type]--;
    }

    /**
     * Decrease sausages by 1.
     * Return true if inn has sausages.
     */
    public useSausages(): boolean {
        if (0 === this._resources.sausages) {
            return false;
        }

        this._resources.sausages--;

        return true;
    }

    /**
     * Decrease loaves by 1.
     * Return true if inn has loaves.
     */
    public useLoaves(): boolean {
        if (0 === this._resources.loaves) {
            return false;
        }

        this._resources.loaves--;

        return true;
    }

    /**
     * Decrease beer by 1.
     * Return true if inn has beer.
     */
    public useBeer(): boolean {
        if (0 === this._resources.beer) {
            return false;
        }

        this._resources.beer--;

        return true;
    }

    protected getBuildingData() {
        return {};
    }

    get currentSausagesStore(): number {
        return this._resources.sausages;
    }

    get currentBeerStore(): number {
        return this._resources.beer;
    }

    get currentLoavesStore(): number {
        return this._resources.loaves;
    }
}