"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = __importDefault(require("../Job"));
const Map_1 = __importDefault(require("../../Map/Map"));
const gameSettings_1 = require("../../gameSettings");
class Harvest extends Job_1.default {
    constructor(player, character, field) {
        super(player);
        this._type = 'harvest';
        this._character = null;
        this._field = null;
        this._isCharacterWalking = false;
        this._isCharacterAtStart = false;
        this._targetFieldPosition = field.position.position;
        this._character = character;
        this._field = field;
    }
    beforeDestroy() { }
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
                        this._field.harvest();
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
                    this._character.building.increaseStore();
                    this._currentStep++;
                }
                break;
        }
    }
}
exports.default = Harvest;
//# sourceMappingURL=Harvest.js.map