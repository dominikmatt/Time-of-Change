import Job from "../Job";
import JobInterface from "../JobInterface";
import Player from "../../Player";
import Character from "../../Characters/Character";
import {GAME_SPEED} from "../../gameSettings";
import Sawmill from "../../Buildings/types/Sawmill";
import Mill from "../../Buildings/types/Mill";

export default class Grind extends Job implements JobInterface {
    protected readonly _type: string = 'grind';
    private readonly _character?: Character = null;
    private _isWorking: boolean = false;

    constructor(
        player: Player,
        character?: Character
    ) {
        super(player);

        this._character = character;
    }

    protected beforeDestroy() {}

    public toJSON(): string {
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
        });
    }

    public update(): void {
        switch (this._currentStep) {
            case 0:
                if (this._character && this._character.isInHouse) {
                    this._currentStep++;
                }
                break;
            case 1:
                if (false === this._isWorking) {
                    (<Mill>this._character.building).decreaseCornStore();
                    this._isWorking = true;
                    this._reAddOnDestroy = false;
                }

                setTimeout(() => {
                    this._currentStep++;
                }, 5000 / GAME_SPEED);
                break;
            case 2:
                    this._character.job = null;
                    this._isWorking = false;
                    (<Mill>this._character.building).increaseFlourStore();

                    this._currentStep++;
                break;
        }
    }
}
