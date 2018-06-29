import Job from "../Job";
import JobInterface from "../JobInterface";
import Player from "../../Player";
import {PositionInterface} from "../../Components/PositionComponent";
import Character from "../../Characters/Character";
import Map from "../../Map/Map";

export default class TransportJob extends Job implements JobInterface {
    protected readonly _type: string = 'transport';
    private readonly _resourceType: string = '';
    private readonly _startPosition: PositionInterface;
    private _path: number[][];
    private readonly _character?: Character = null;
    private _isCharacterWalking: boolean = false;
    private _isCharacterAtStart: boolean = false;

    constructor(player: Player, startPosition: PositionInterface, resourceType: string, character?: Character) {
        super(player);

        this._resourceType = resourceType;
        this._startPosition = startPosition;
        this._character = character;
    }

    public toJSON(): string {
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
            resourceType: this._resourceType,
            startPosition: this._startPosition
        });
    }

    public update(): void {
        if (!this._isCharacterWalking && !this._isCharacterAtStart) {
            this._path = Map.findRunnablePath(this._character.position.position, this._startPosition);

            this._isCharacterWalking = true;
        } else if (this._isCharacterWalking) {
            const next = this._path.shift();

            if (next) {
                this._character.position.position = {
                    x: next[0],
                    z: next[1]
                };
            }
        }

        if (this._character.position.x === this._startPosition.x &&
            this._character.position.z === this._startPosition.z
        ) {
            this._isCharacterAtStart = true;
            this._isCharacterWalking = false;
        }
    }
}
