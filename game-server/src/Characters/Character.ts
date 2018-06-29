import Player from "../Player";
import {v1 as uuidv1} from "uuid";
import {PositionComponent} from "../Components/PositionComponent";
import Core from "../Core";
import Job from "../Jobs/Job";

export default class Character {
    protected _id: string =  uuidv1();

    protected readonly _player: Player;
    private _position: PositionComponent;
    protected _job?: Job = null;
    protected _walkTarget: number[][];

    constructor(player: Player) {
        this._player = player;
        this._position = new PositionComponent({
            x: 2,
            z: 2
        });
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

        this._player.wsSocket.emit('character.update', {
            _id: this._id,
            type: this.getType(),
            data: this.getCharacterData()
        });

        Core.emitAll('character.update.position', {
            _id: this._id,
            type: this.getType(),
            position: this._position.position
        });
    }

    get position(): PositionComponent {
        return this._position;
    }
}