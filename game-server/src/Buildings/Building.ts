import {v1 as uuidv1} from "uuid";
import {PositionComponent, PositionInterface} from "../Components/PositionComponent";
import Player from "../Player";
import CostComponent from "../Components/CostComponent";
import HealthComponent from "../Components/HealthComponent";
import TransportJob from "../Jobs/types/TransportJob";
import Map from "../Map/Map";
import BuildJob from "../Jobs/types/BuildJob";
import Core from "./../Core";
import Character from "../Characters/Character";
import Job from "../Jobs/Job";
import DestroyAbleInterface from "../Components/DestroyAbleInterface";

/**
 * Base class for all Buildings.
 */
export default abstract class Building implements DestroyAbleInterface {
    private readonly _id: string =  uuidv1();

    protected _character: Character | null = null;

    private _position: PositionComponent;

    private _health: HealthComponent<Building>;

    protected _player: Player;

    public _cost: CostComponent;

    protected _nextJob: Job | null = null;

    readonly _matrix: number[][];
    public doorPosition: PositionInterface;
    public outsidePosition: PositionInterface;

    private _buildResources: object = {
       stones: 0,
       timber: 0
    };

    protected _resources: object = {};

    private _completelyBuilt: boolean = false;

    protected constructor(player: Player, position: PositionInterface) {
        this._player = player;
        this._position = new PositionComponent(position);
    }

    /**
     * Perpare start of building.
     */
    protected build(alreadyBuilt: boolean = false) {
        this.addHealthComponent(alreadyBuilt);

        this.updateMap();

        if (!alreadyBuilt) {
            this.addTransportJobs();
        }
    }

    /**
     * Update map field when building starts build.
     */
    protected updateMap() {
        const startPosition = this._position.position;

        this._matrix.forEach((yRow: number[], x: number) => {
            x = x + startPosition.x;

            yRow.forEach((type: number, z: number) => {
                z = z + startPosition.z;

                Map.updateCoordinate(x, z, {
                    runnable: type === 2,
                    building: this._id,
                    hasTree: false,
                    hasStone: false,
                });

                // Set door position;
                if (2 === type) {
                    this.doorPosition = {
                        x: x,
                        z: z
                    };

                    this.outsidePosition = {
                        x: x,
                        z: z
                    };

                    this.outsidePosition.x++;
                }
            });
        });

        Map.updateCoordinate(this.outsidePosition.x, this.outsidePosition.z, {
            runnable: true,
            building: this._id,
            hasTree: false,
            hasStone: false,
        });
    }

    protected beforeUpdate() {}

    /**
     * This method will create all transport jobs to the jobs store.
     */
    protected addTransportJobs() {
        for (let count = 0; count < this._cost.cost.stones; count++) {
            this._player.jobStore.addJob(new TransportJob(this._player, this.doorPosition, 'stones', this));
        }

        for (let count = 0; count < this._cost.cost.timber; count++) {
            this._player.jobStore.addJob(new TransportJob(this._player, this.doorPosition, 'timber', this));
        }
    }

    /**
     * This method will create all transport jobs to the jobs store.
     */
    protected addBuildJob() {
        this._player.jobStore.addJob(new BuildJob(this._player, this));

    }

    protected addHealthComponent(alreadyBuilt: boolean = false) {
        this._health = new HealthComponent<Building>(this, this._cost.getHealth(), alreadyBuilt ? this._cost.getHealth() : 0);
    }

    /**
     * Returns building type as a string.
     */
    public getType() {
        return this.constructor.name.toLowerCase();
    }

    /**
     * Returns all building specific data as a object.
     */
    protected getBuildingData (): object {
        throw new Error('Building: Add getBuildingData and return your building specific data as a object.')
    }

    update() {
        this.beforeUpdate();

        if (this._health.maxHealth === this._health.currentHealth) {
            this._completelyBuilt = true;
        }

        Core.emitAll('building.update', {
            _id: this._id,
            type: this.getType(),
            position: this.position.position,
            data: this.getBuildingData(),
            playerId: this._player.playerId,
            currentHealth: this.health.currentHealth,
            maxHealth: this.health.maxHealth,
            matrix: this._matrix
        });
    }

    public destroy() {
        throw new Error('Implement destroy on Buildings.');
    }

    protected afterResourceAdded(type: string) {}

    public addBuildResource(type: string) {
        (<any>this._buildResources)[type]++;

        this.addBuildJob();
    }

    public addResource(type: string) {
        (<any>this._resources)[type]++;

        this.afterResourceAdded(type);
    }

    public increaseHealth() {
        this._health.currentHealth += 50;
    }

    get position(): PositionComponent {
        return this._position;
    }

    set position(value: PositionComponent) {
        this._position = value;
    }

    get player(): Player {
        return this._player;
    }

    get health(): HealthComponent<Building> {
        return this._health;
    }

    get id(): string {
        return this._id;
    }

    get completelyBuilt(): boolean {
        return this._completelyBuilt;
    }

    get character(): Character | null {
        return this._character;
    }

    set character(value: Character) {
        this._character = value;
    }

    get nextJob(): Job | null {
        return this._nextJob;
    }
}
