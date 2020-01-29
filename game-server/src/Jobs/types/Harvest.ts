import Job from "../Job";
import JobInterface from "../JobInterface";
import Player from "../../Player";
import {PositionInterface} from "../../Components/PositionComponent";
import Character from "../../Characters/Character";
import Map from "../../Map/Map";
import {GAME_SPEED} from "../../gameSettings";
import Woodcutters from "../../Buildings/types/Woodcutters";
import Field from "../../Field/Field";
import Farmer from "../../Characters/types/Farmer";
import Farm from "../../Buildings/types/Farm";
import Sawmill from "../../Buildings/types/Sawmill";

export default class Harvest extends Job implements JobInterface {
    protected readonly _type: string = 'harvest';
    private readonly _targetFieldPosition: PositionInterface;
    private readonly _character?: Character = null;
    private readonly _field?: Field = null;
    private _isCharacterWalking: boolean = false;
    private _isCharacterAtStart: boolean = false;

    constructor(
        player: Player,
        character: Character,
        field: Field
    ) {
        super(player);

        this._targetFieldPosition = field.position.position;
        this._character = character;
        this._field = field;
    }

    protected beforeDestroy() {}

    public toJSON(): string {
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
            field: this._field.toObject(),
        });
    }

    public update(): void {
        switch (this._currentStep) {
            // GOTO Field
            case 0:
                if (!this._isCharacterWalking && !this._isCharacterAtStart) {
                    const path = Map.findRunnablePath(
                        this._character.position.position,
                        this._targetFieldPosition,
                        true
                    );

                    this._character.walkByPath(path);
                    this._isCharacterWalking = true;

                    this._currentStep++;
                }
                break;
            // Sow field
            case 1:
                if (this._character.position.x === this._targetFieldPosition.x &&
                    this._character.position.z === this._targetFieldPosition.z
                ) {
                    this._isCharacterWalking = false;

                    setTimeout(() => {
                        if (1 !== this._currentStep) {
                            return;
                        }

                        this._field.harvest();

                        this._currentStep++;
                    }, 5000 / GAME_SPEED);
                }
                break;
            // Back to farm
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
                    (<Farm>this._character.building).increaseStore();

                    this._currentStep++;
                }
                break;
        }
    }
}
