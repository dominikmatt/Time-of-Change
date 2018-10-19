import Player from "../Player";
import {v1 as uuidv1} from "uuid";
import {PositionComponent, PositionInterface} from "../Components/PositionComponent";
import Core from "../Core";
import Job from "../Jobs/Job";
import Schoolhouse from "../Buildings/types/Schoolhouse";
import Building from "../Buildings/Building";

export default class Character {
    protected _id: string =  uuidv1();

    protected readonly _player: Player;
    private _position: PositionComponent;
    protected _job?: Job = null;
    protected _walkTarget: number[][];
    protected _currentPath: number[][] = [];
    private _walkDelta: number = 0;

    constructor(player: Player, buildingId: string) {
        let schoolhouse: Building;
        let position: PositionInterface = {
            x: 2,
            z: 2
        };

        this._player = player;

        if ('start' !== buildingId) {
            schoolhouse = this._player.getBuildingById(buildingId);
            position = schoolhouse.doorPosition;
        }

        this._position = new PositionComponent(position);
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

    update() {
        if (null === this._job) {
            this.findJob();
        } else {
            this._job.update();
        }

        // Do walk - ever second to the next field.
        if (0 < this._currentPath.length) {
            this._walkDelta += Core.currentTick.delta;

            if (1 <= this._walkDelta) {
                const next = this._currentPath.shift();

                if (next) {
                    this.position.position = {
                        x: next[0],
                        z: next[1]
                    };
                }

                this._walkDelta = 0;
            }
        }

        this._player.wsSocket.emit('character.update', {
            _id: this._id,
            type: this.getType(),
            data: this.getCharacterData(),
            position: this.position.position,
        });

        Core.emitAll('character.update.position', {
            _id: this._id,
            type: this.getType(),
            position: this._position.position
        });
    }

    walkByPath(path: number[][]) {
        this._currentPath = path;
        this._walkDelta = 0;
    }

    get position(): PositionComponent {
        return this._position;
    }

    set job(value: Job) {
        this._job = value;
    }
}