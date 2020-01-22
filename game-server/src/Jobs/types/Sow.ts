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

enum SowJobStates {
    notStarted = 'notStarted',
    waiting = 'waitng',
    walkingToField = 'walkingToField',
    sow = 'sow',
    walkingToBuilding = 'walkingToBuilding',
}

export default class Sow extends Job implements JobInterface {
    protected readonly _type: string = 'sow';
    private readonly _targetFieldPosition: PositionInterface;
    private readonly _character?: Character = null;
    private readonly _field?: Field = null;
    private _isCharacterWalking: boolean = false;
    private _isCharacterAtStart: boolean = false;
    private _jobStatus: SowJobStates = SowJobStates.notStarted;

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
            case 0:
                if (SowJobStates.notStarted === this._jobStatus) {
                    console.log('setTimeout');
                    setTimeout(() => {
                        this._currentStep++;
                    }, 6000 / GAME_SPEED);

                    this._jobStatus = SowJobStates.waiting;
                }
                break;
            // GOTO Field
            case 1:
                this._jobStatus = SowJobStates.walkingToField;

                if (this._character.building.doorPosition.x === this._character.position.x &&
                    this._character.building.doorPosition.z === this._character.position.z &&
                    !this._isCharacterWalking && !this._isCharacterAtStart) {
                    console.log('go to field')
                    const toFieldPath = Map.findRunnablePath(
                        this._character.position.position,
                        this._targetFieldPosition,
                        true
                    );
                    console.log(toFieldPath)

                    this._character.walkByPath(toFieldPath);
                    this._isCharacterWalking = true;

                    this._currentStep++;
                }
                break;
            // Sow field
            case 2:
                if (this._character.position.x === this._targetFieldPosition.x &&
                    this._character.position.z === this._targetFieldPosition.z &&
                    SowJobStates.walkingToField === this._jobStatus
                ) {
                    this._jobStatus = SowJobStates.sow;
                    this._isCharacterWalking = false;

                    console.log('sow timeout start')
                    setTimeout(() => {
                        if (2 !== this._currentStep) {
                            return;
                        }

                        this._field.sow();
                        console.log('sow')

                        this._currentStep++;
                    }, 12000 / GAME_SPEED);
                }
                break;
            // Back to farm
            case 3:
                this._jobStatus = SowJobStates.walkingToBuilding;

                const toBuildingPath = Map.findRunnablePath(
                    this._character.position.position,
                    this._character.building.doorPosition
                );

                this._character.walkByPath(toBuildingPath);
                this._isCharacterWalking = true;

                this._currentStep++;
                break;
            case 4:
                if (this._character.position.x === this._character.building.doorPosition.x &&
                    this._character.position.z === this._character.building.doorPosition.z
                ) {
                    this._character.job = null;
                    (<Farm>this._character.building).sowDone();

                    this._currentStep++;
                    this._jobStatus = SowJobStates.notStarted;
                }
                break;
        }
    }
}
