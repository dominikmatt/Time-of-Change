import Job from "../Job";
import JobInterface from "../JobInterface";
import Player from "../../Player";
import {PositionInterface} from "../../Components/PositionComponent";
import Character from "../../Characters/Character";
import Map from "../../Map/Map";
import Storehouse from "../../Buildings/types/Storehouse";
import Building from "../../Buildings/Building";

export default class BuildJob extends Job implements JobInterface {
    protected readonly _type: string = 'build';
    private readonly _targetBuilding: Building;
    private readonly _character?: Character = null;
    private _isCharacterWalking: boolean = false;
    private _isCharacterAtStart: boolean = false;

    constructor(
        player: Player,
        targetBuilding?: Building,
        character?: Character
    ) {
        super(player);

        this._targetBuilding = targetBuilding;
        this._character = character;
    }


    public toJSON(): string {
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
            targetBuilding: this._targetBuilding.id
        });
    }

    public update(): void {
        switch (this._currentStep) {
            case 0:
                if (!this._isCharacterWalking && !this._isCharacterAtStart) {
                    const path = Map.findRunnablePath(
                        this._character.position.position,
                        this._targetBuilding.doorPosition
                    );

                    this._character.walkByPath(path);
                    this._isCharacterWalking = true;

                    this._currentStep++;
                }
                break;
            case 1:
                if (this._character.position.x === this._targetBuilding.doorPosition.x &&
                    this._character.position.z === this._targetBuilding.doorPosition.z
                ) {
                    this._isCharacterAtStart = true;
                    this._isCharacterWalking = false;

                    setTimeout(() => {
                        if (1 !== this._currentStep) {
                            return;
                        }

                        this._currentStep++;
                    }, 5000);
                }
                break;
            case 2:
                this._targetBuilding.increaseHealth();
                this._character.job = null;
                break;
        }
    }
}
