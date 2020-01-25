import Player from "../Player";
import {v1 as uuidv1} from "uuid";
import {PositionComponent, PositionInterface} from "../Components/PositionComponent";
import Core from "../Core";
import Job from "../Jobs/Job";
import Building from "../Buildings/Building";
import Map from "../Map/Map";
import {GAME_SPEED} from "../gameSettings";
import {arrayPathToObject} from "../utils/path";
import HealthComponent from "../Components/HealthComponent";
import DestroyAbleInterface from "../Components/DestroyAbleInterface";
import GoEatJob from "../Jobs/types/GoEatJob";

export default class Character implements DestroyAbleInterface {
    private _id: string =  uuidv1();

    protected readonly _player: Player;
    private _position: PositionComponent;
    private _health: HealthComponent<Character>;
    private _isAlive: boolean = true;
    protected _job?: Job = null;
    protected _building?: Building = null;
    protected _walkTarget: PositionInterface | null = null;
    protected _currentPath: number[][] = [];
    private _walkDelta: number = 0;
    private _isInHouse: boolean = false;

    constructor(player: Player, buildingId: string) {
        let schoolhouse: Building;
        let position: PositionInterface = {
            x: Math.floor(Math.random() * 10) + 1,
            z: Math.floor(Math.random() * 10) + 1
        };

        this._player = player;

        if ('start' !== buildingId) {
            schoolhouse = this._player.getBuildingById(buildingId);
            position = schoolhouse.doorPosition;
        }

        this._position = new PositionComponent(position);
        this._health = new HealthComponent<Character>(this, 100, 100);
    }

    public getNeedBuilding(): boolean {
        return false;
    }

    /**
     * Character is death now destroy it.
     */
    public destroy() {
        this._isAlive = false;

        if (true === this._job.reAddOnDestroy) {
            this._job.destroy()
            this._player.jobStore.addJob(this._job);
        }

        if (null !== this._building) {
            console.log('remove from building');
            this._building.character = null;
        }
    }

    /**
     * Returns all character specific data as a object.
     */
    protected getCharacterData (): object {
        throw new Error('Character: Implement "getCharacterData" and return your character specific data as a object.')
    }

    /**
     * Returns character type as a string.
     */
    public getType (): string {
        throw new Error('Character: Implement "getType" and return your type as a string.')
    }

    /**
     * Find a job and start working.
     */
    protected findJob() {
        throw new Error('Character: Implement "findJob" method.')
    }

    /**
     * Add goEatJob when currentHealt is smaller or equal 20.
     */
    protected mustGoEat(): boolean {
        if (20 >= this._health.currentHealth) {
            this._job = new GoEatJob(this._player, this);
            return true;
        }

        return false;
    }

    public getBuildingType(): string {
        throw new Error('Character: Implement "getBuildingType" method.')
    }


    update() {
        // Character is alive.
        if (true === this.isAlive) {
            // Has no job search a workplace.
            if (true === this.getNeedBuilding() && null === this._building) {
                return this.searchBuilding();
            }

            // check if character at the workplace.
            this.checkInHouse();

            if (null === this._job) {
                if (false === this.mustGoEat()) {
                    this.findJob();
                }
            } else {
                this._job.update();
            }

            // Do walk - ever second to the next field.
            if (0 < this._currentPath.length) {
                this._walkDelta += Core.currentTick.delta * GAME_SPEED;

                if (1 <= this._walkDelta) {
                    const next = this._currentPath.shift();


                    if (next) {
                        this.position.position = {
                            x: next[0],
                            z: next[1]
                        };

                        this._health.decreaseHealt(0.5);
                    }

                    this._walkDelta = 0;
                }
            }
        }

        Core.emitAll('character.update', {
            _id: this._id,
            type: this.getType(),
            position: this._position.position,
            isWalking: 0 < this._currentPath.length,
            walkingPath: arrayPathToObject(this._currentPath),
            isAlive: this._isAlive,
            health: {
                current: this._health.currentHealth,
                max: this._health.maxHealth,
            }
        });
    }

    private checkInHouse() {
        if (!this._position || !this._building) {
            return;
        }

        this._isInHouse = this._position.position.x === this._building.doorPosition.x && this._position.position.z === this._building.doorPosition.z;
    }

    private searchBuilding() {
        const building: Building | null = this._player.getBuildingByType(this.getBuildingType(), false, true);

        if (null === building) {
            return;
        }

        this._building = building;
        building.character = this;

        const path = Map.findRunnablePath(
            this.position.position,
            building.doorPosition
        );

        this.walkByPath(path);
    }

    walkByPath(path: number[][]) {
        this._currentPath = path;
        this._walkDelta = 0;
    }

    get id(): string {
        return this._id;
    }

    get position(): PositionComponent {
        return this._position;
    }

    get job() {
        return this._job;
    }

    set job(value: Job) {
        this._job = value;
    }

    get building(): Building {
        return this._building;
    }

    get isInHouse(): boolean {
        return this._isInHouse;
    }

    get isAlive(): boolean {
        return this._isAlive;
    }

    get health(): HealthComponent<Character> {
        return this._health;
    }
}