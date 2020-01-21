"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = require("../Job");
const Map_1 = require("../../Map/Map");
const gameSettings_1 = require("../../gameSettings");
class Sow extends Job_1.default {
    constructor(player, character, field) {
        super(player);
        this._type = 'sow';
        this._character = null;
        this._field = null;
        this._isCharacterWalking = false;
        this._isCharacterAtStart = false;
        this._targetFieldPosition = field.position.position;
        this._character = character;
        this._field = field;
    }
    toJSON() {
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
            field: this._field.toObject(),
        });
    }
    update() {
        switch (this._currentStep) {
            // GOTO Field
            case 0:
                if (!this._isCharacterWalking && !this._isCharacterAtStart) {
                    const path = Map_1.default.findRunnablePath(this._character.position.position, this._targetFieldPosition, true);
                    this._character.walkByPath(path);
                    this._isCharacterWalking = true;
                    this._currentStep++;
                }
                break;
            // Sow field
            case 1:
                if (this._character.position.x === this._targetFieldPosition.x &&
                    this._character.position.z === this._targetFieldPosition.z) {
                    this._isCharacterWalking = false;
                    setTimeout(() => {
                        if (1 !== this._currentStep) {
                            return;
                        }
                        this._field.sow();
                        this._currentStep++;
                    }, 5000 / gameSettings_1.GAME_SPEED);
                }
                break;
            // Back to farm
            case 2:
                const path = Map_1.default.findRunnablePath(this._character.position.position, this._character.building.doorPosition);
                this._character.walkByPath(path);
                this._isCharacterWalking = true;
                this._currentStep++;
                break;
            case 3:
                if (this._character.position.x === this._character.building.doorPosition.x &&
                    this._character.position.z === this._character.building.doorPosition.z) {
                    this._character.job = null;
                    this._character.building.sowDone();
                    this._currentStep++;
                }
                break;
        }
    }
}
exports.default = Sow;
//# sourceMappingURL=Sow.js.map