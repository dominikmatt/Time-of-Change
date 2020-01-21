"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = require("../Job");
const Map_1 = require("../../Map/Map");
const gameSettings_1 = require("../../gameSettings");
/**
 * Transport resource to building.
 */
class GoEatJob extends Job_1.default {
    constructor(player, character) {
        super(player);
        this._type = 'goEat';
        this._character = null;
        this._isCharacterWalking = false;
        this._isCharacterAtStart = false;
        this._isEating = false;
        this._character = character;
    }
    toJSON() {
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
        });
    }
    eat(increaseHealt) {
        this._isEating = true;
        setTimeout(() => {
            this._character.health.increaseHealt(increaseHealt);
            this._isEating = false;
        }, 5000 * gameSettings_1.GAME_SPEED);
    }
    update() {
        switch (this._currentStep) {
            case 0:
                this._inn = this._player.buildingManager.findNearestInn(this._character.position.position);
                if (this._inn) {
                    this._currentStep++;
                }
                break;
            case 1:
                if (!this._isCharacterWalking && !this._isCharacterAtStart) {
                    const path = Map_1.default.findRunnablePath(this._character.position.position, this._inn.doorPosition);
                    this._character.walkByPath(path);
                    this._isCharacterWalking = true;
                    this._currentStep++;
                }
                break;
            case 2:
                if (this._character.position.x === this._inn.doorPosition.x &&
                    this._character.position.z === this._inn.doorPosition.z) {
                    if (true === this._isEating) {
                        return;
                    }
                    if (40 > this._character.health.currentHealth && this._inn.useSausages()) {
                        this.eat(60);
                    }
                    else if (80 > this._character.health.currentHealth && this._inn.useLoaves()) {
                        this.eat(40);
                    }
                    else if (100 > this._character.health.currentHealth && this._inn.useBeer()) {
                        this.eat(20);
                    }
                    else { // Go outside from building.
                        const path = Map_1.default.findRunnablePath(this._character.position.position, this._inn.outsidePosition);
                        this._character.walkByPath(path);
                        this._isCharacterWalking = true;
                        this._currentStep++;
                    }
                }
                break;
            case 3:
                if (this._character.position.x === this._inn.outsidePosition.x &&
                    this._character.position.z === this._inn.outsidePosition.z) {
                    this._character.job = null;
                }
                break;
        }
    }
}
exports.default = GoEatJob;
//# sourceMappingURL=GoEatJob.js.map