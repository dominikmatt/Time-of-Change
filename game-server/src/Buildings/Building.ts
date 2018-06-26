import {v1 as uuidv1} from "uuid";
import {PositionComponent, PositionInterface} from "../Components/PositionComponent";
import Player from "../Player";
import CostComponent from "../Components/CostComponent";
import HealthComponent from "../Components/HealthComponent";
import TransportJob from "../Jobs/types/TransportJob";

/**
 * Base class for all Buildings.
 */
export default abstract class Building {
    protected _id: string =  uuidv1();

    protected character: any; // TODO: Change to Character.

    private _position: PositionComponent;

    private _healt: HealthComponent;

    protected _player: Player;

    public _cost: CostComponent;

    protected constructor(player: Player, position: PositionInterface) {
        this._player = player;
        this._position = new PositionComponent(position);
    }

    protected build(alreadyBuilt: boolean = false) {
        this.addHealtComponent(alreadyBuilt);

        if (!alreadyBuilt) {
            this.addJobs();
        }
    }

    /**
     * This method will create all transport jobs to the jobs store.
     */
    protected addJobs() {
        for (let count = 0; count < this._cost.cost.stone; count++) {
            this._player.jobStore.addJob(new TransportJob(this._player, 'stone'));
        }

        for (let count = 0; count < this._cost.cost.timber; count++) {
            this._player.jobStore.addJob(new TransportJob(this._player, 'timber'));
        }

        setInterval(() => {
        this._player.jobStore.getFreeJobByType('transport')
            .then((job) => {
                console.log(job);
            });
        }, 1000);
    }

    protected addHealtComponent(alreadyBuilt: boolean = false) {
        this._healt = new HealthComponent(this._cost.getHealth(), alreadyBuilt ? this._cost.getHealth() : 0);
    }

    /**
     * Returns type as a string.
     *
     * @return {string}
     */
    protected getType (): string {
        throw new Error('Building: Add getType and return your type as a string.')
    }

    /**
     * Returns all building specific data as a object.
     *
     * @return {object}
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
            maxHealth: this.healt.maxHealth
        });
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
}
