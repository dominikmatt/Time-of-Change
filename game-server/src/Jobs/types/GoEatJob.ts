import Job from "../Job";
import JobInterface from "../JobInterface";
import Player from "../../Player";
import Character from "../../Characters/Character";
import Inn from "../../Buildings/types/Inn";
import Map from "../../Map/Map";
import {GAME_SPEED} from "../../gameSettings";

/**
 * Transport resource to building.
 */
export default class GoEatJob extends Job implements JobInterface {
    protected readonly _type: string = 'goEat';
    private readonly _character?: Character = null;
    private _isCharacterWalking: boolean = false;
    private _inn: Inn;
    private _isCharacterAtStart: boolean = false;
    private _isEating: boolean = false;

    constructor(
        player: Player,
        character: Character,
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

    private eat(increaseHealt: number) {
        this._isEating = true;

        setTimeout(() => {
            this._character.health.increaseHealt(increaseHealt);
            this._isEating = false;
        }, 5000 * GAME_SPEED);
    }

    public update(): void {
        switch (this._currentStep) {
            case 0:
                this._inn = this._player.buildingManager.findNearestInn<Inn>(this._character.position.position);

                if (this._inn) {
                    this._currentStep++;
                }
                break;
            case 1:
                if (!this._isCharacterWalking && !this._isCharacterAtStart) {
                    const path = Map.findRunnablePath(this._character.position.position, this._inn.doorPosition);

                    this._character.walkByPath(path);
                    this._isCharacterWalking = true;

                    this._currentStep++;
                }
                break;
            case 2:
                if (this._character.position.x === this._inn.doorPosition.x &&
                    this._character.position.z === this._inn.doorPosition.z
                ) {
                    if (true === this._isEating) {
                        return;
                    }

                    if (40 > this._character.health.currentHealth && this._inn.useSausages()) {
                        this.eat(60);
                    } else if (80 > this._character.health.currentHealth && this._inn.useLoaves()) {
                        this.eat(40);
                    } else if (100 > this._character.health.currentHealth && this._inn.useBeer()) {
                        this.eat(20);
                    } else { // Go outside from building.
                        const path = Map.findRunnablePath(this._character.position.position, this._inn.outsidePosition);
                        this._character.walkByPath(path);
                        this._isCharacterWalking = true;

                        this._currentStep++;
                    }
                }
                break;
            case 3:
                if (this._character.position.x === this._inn.outsidePosition.x &&
                    this._character.position.z === this._inn.outsidePosition.z
                ) {
                    this._character.job = null;
                }
                break;
        }

    }
}
