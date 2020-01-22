import Job from "../Job";
import JobInterface from "../JobInterface";
import Player from "../../Player";
import {PositionInterface} from "../../Components/PositionComponent";
import Character from "../../Characters/Character";
import Map from "../../Map/Map";
import {GAME_SPEED} from "../../gameSettings";
import Quarry from "../../Buildings/types/Quarry";

export default class ChopStone extends Job implements JobInterface {
    protected readonly _type: string = 'chopStone';
    private readonly _targetStonePosition: PositionInterface;
    private readonly _character?: Character = null;
    private _isCharacterWalking: boolean = false;
    private _isCharacterAtStart: boolean = false;

    constructor(
        player: Player,
        targetStonePosition?: PositionInterface,
        character?: Character
    ) {
        super(player);

        this._targetStonePosition = targetStonePosition;
        this._character = character;
    }

    protected beforeDestroy() {}

    public toJSON(): string {
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
            targetStonePosition: this._targetStonePosition,
        });
    }

    public update(): void {
        switch (this._currentStep) {
            case 0:
                if (!this._isCharacterWalking && !this._isCharacterAtStart) {
                    const path = Map.findRunnablePath(
                        this._character.position.position,
                        this._targetStonePosition,
                        true
                    );

                    this._character.walkByPath(path);
                    this._isCharacterWalking = true;

                    this._currentStep++;
                }
                break;
            case 1:
                if (this._character.position.x === this._targetStonePosition.x &&
                    this._character.position.z === this._targetStonePosition.z
                ) {
                    this._isCharacterWalking = false;

                    setTimeout(() => {
                        if (1 !== this._currentStep) {
                            return;
                        }

                        Map.updateCoordinate(
                            this._targetStonePosition.x,
                            this._targetStonePosition.z,
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
                    (<Quarry>this._character.building).increaseStore();

                    this._currentStep++;
                }
                break;
        }
    }
}
