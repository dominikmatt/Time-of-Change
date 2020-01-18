import Job from "../Job";
import JobInterface from "../JobInterface";
import Player from "../../Player";
import {PositionInterface} from "../../Components/PositionComponent";
import Character from "../../Characters/Character";
import Map from "../../Map/Map";
import {GAME_SPEED} from "../../gameSettings";
import Woodcutters from "../../Buildings/types/Woodcutters";

export default class ChopWood extends Job implements JobInterface {
    protected readonly _type: string = 'chopWood';
    private readonly _targetTreePosition: PositionInterface;
    private readonly _character?: Character = null;
    private _isCharacterWalking: boolean = false;
    private _isCharacterAtStart: boolean = false;

    constructor(
        player: Player,
        targetTreePosition?: PositionInterface,
        character?: Character
    ) {
        super(player);

        this._targetTreePosition = targetTreePosition;
        this._character = character;
    }


    public toJSON(): string {
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
            targetTreePosition: this._targetTreePosition,
        });
    }

    public update(): void {
        switch (this._currentStep) {
            case 0:
                if (!this._isCharacterWalking && !this._isCharacterAtStart) {
                    const path = Map.findRunnablePath(
                        this._character.position.position,
                        this._targetTreePosition,
                        true
                    );

                    this._character.walkByPath(path);
                    this._isCharacterWalking = true;

                    this._currentStep++;
                }
                break;
            case 1:
                if (this._character.position.x === this._targetTreePosition.x &&
                    this._character.position.z === this._targetTreePosition.z
                ) {
                    this._isCharacterWalking = false;

                    setTimeout(() => {
                        if (1 !== this._currentStep) {
                            return;
                        }

                        Map.updateCoordinate(
                            this._targetTreePosition.x,
                            this._targetTreePosition.z,
                            {
                                hasTree: false,
                                runnable: true
                            }
                        );

                        this._currentStep++;
                    }, 5000 / GAME_SPEED);
                }
                break;
            case 2:
                const path = Map.findRunnablePath(
                    this._character.position.position,
                    this._character.building.doorPosition
                );

                this._character.walkByPath(path);
                this._isCharacterWalking = true;

                this._currentStep++;
                break;
            case 3:
                if (this._character.position.x === this._character.building.doorPosition.x &&
                    this._character.position.z === this._character.building.doorPosition.z
                ) {
                    this._character.job = null;
                    (<Woodcutters>this._character.building).increaseStore();

                    this._currentStep++;
                }
                break;
        }
    }
}
