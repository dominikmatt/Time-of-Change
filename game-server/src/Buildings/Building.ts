import {v1 as uuidv1} from "uuid";
import {PositionComponent, PositionInterface} from "../Components/PositionComponent";
import Player from "../Player";
import CostComponent from "../Components/CostComponent";
import HealthComponent from "../Components/HealthComponent";
import TransportJob from "../Jobs/types/TransportJob";
import Core from "../Core";
import Map from "../Map/Map";

/**
 * Base class for all Buildings.
 */
export default abstract class Building {
    private readonly _id: string =  uuidv1();

    protected character: any; // TODO: Change to Character.

    private _position: PositionComponent;

    private _healt: HealthComponent;

    protected _player: Player;

    public _cost: CostComponent;

    readonly _matrix: number[][];
    public doorPosition: PositionInterface;

    private _buildResources: object = {
       stones: 0,
       timber: 0
    };

    protected constructor(player: Player, position: PositionInterface) {
        this._player = player;
        this._position = new PositionComponent(position);
    }

    /**
     * Perpare start of building.
     */
    protected build(alreadyBuilt: boolean = false) {
        this.addHealtComponent(alreadyBuilt);

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
                    hasTree: false
                });

                // Set door position;
                if (2 === type) {
                    this.doorPosition = {
                        x: x,
                        z: z
                    };
                }
            });
        });
    }

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
        this._player.jobStore.addJob(new BuildJ(this._player, this.doorPosition, 'stones', this));

    }

    protected addHealtComponent(alreadyBuilt: boolean = false) {
        this._healt = new HealthComponent(this._cost.getHealth(), alreadyBuilt ? this._cost.getHealth() : 0);
    }

    /**
     * Returns building type as a string.
     */
    public getType (): string {
        throw new Error('Building: Add getType and return your type as a string.')
    }

    /**
     * Returns all building specific data as a object.
     */
    protected getBuildingData (): object {
        throw new Error('Building: Add getBuildingData and return your building specific data as a object.')
    }

    update() {
        this.player.wsSocket.emit('building.update', {
            _id: this._id,
            type: this.getType(),
            position: this.position.position,
            data: this.getBuildingData(),
            currentHealth: this.healt.currentHealth,
            maxHealth: this.healt.maxHealth,
            matrix: this._matrix
        });
    }

    public addBuildResource(type: string) {
        (<any>this._buildResources)[type]++;
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

    get healt(): HealthComponent {
        return this._healt;
    }

    get id(): string {
        return this._id;
    }
}
