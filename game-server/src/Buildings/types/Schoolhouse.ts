import EconomyBuilding from "../EconomyBuilding";
import BuildingInterface from "../BuildingInterface";
import CostComponent from "../../Components/CostComponent";
import {PositionInterface} from "../../Components/PositionComponent";
import Player from "../../Player";
import CharacterFactory from "../../Characters/CharacterFactory";
import {GAME_SPEED} from "../../gameSettings";
import panel from "../../Panel/panel";

/**
 * The storehouse will store all Resources from the player.
 */
export default class Schoolhouse extends EconomyBuilding implements BuildingInterface {
    private readonly _maxGoldStore: number = 5;

    private _queue: string[] = [];

    readonly _matrix: number[][] = [
        [1,1,1],
        [1,2,1]
    ];

    private _currentGoldStore: number = 0;
    private _runningQueue: string | null = null;

    constructor(player: Player, position: PositionInterface, alreadyBuilt: boolean = false) {
        super(player, position);

        this._cost = new CostComponent({
            timber: 6,
            stones: 5
        });

        this.build(alreadyBuilt);
    }

    public getType() {
        return 'schoolhouse';
    }

    protected getBuildingData() {
        return {
            maxGoldStore: this._maxGoldStore,
            currentGoldStore: this._currentGoldStore
        };
    }

    protected beforeUpdate() {
        this.updateQueue();
    }

    public addToQueue(type: string) {
        this._queue.push(type);

        panel.update();
    }

    private updateQueue() {
        if (0 === this._queue.length || null !== this._runningQueue) {
            return;
        }

        this._runningQueue = this._queue.pop();

        setTimeout(() => {
            this.player.addCharacter(CharacterFactory(this._runningQueue, this.id, this.player));
            this._runningQueue = null;
        }, 5000 / GAME_SPEED);
    }

    get currentGoldStore(): number {
        return this._currentGoldStore;
    }

    set currentGoldStore(value: number) {
        this._currentGoldStore = value;
    }

    get queue(): string[] {
        return this._queue;
    }

    get runningQueue(): string | null {
        return this._runningQueue;
    }
}