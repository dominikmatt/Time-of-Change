"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = __importDefault(require("../Job"));
const Map_1 = __importDefault(require("../../Map/Map"));
const gameSettings_1 = require("../../gameSettings");
var SowJobStates;
(function (SowJobStates) {
    SowJobStates["notStarted"] = "notStarted";
    SowJobStates["waiting"] = "waitng";
    SowJobStates["walkingToField"] = "walkingToField";
    SowJobStates["sow"] = "sow";
    SowJobStates["walkingToBuilding"] = "walkingToBuilding";
})(SowJobStates || (SowJobStates = {}));
class Sow extends Job_1.default {
    constructor(player, character, field) {
        super(player);
        this._type = 'sow';
        this._character = null;
        this._field = null;
        this._isCharacterWalking = false;
        this._isCharacterAtStart = false;
        this._jobStatus = SowJobStates.notStarted;
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
            case 0:
                if (SowJobStates.notStarted === this._jobStatus) {
                    console.log('setTimeout');
                    setTimeout(() => {
                        this._currentStep++;
                    }, 6000 / gameSettings_1.GAME_SPEED);
                    this._jobStatus = SowJobStates.waiting;
                }
                break;
            // GOTO Field
            case 1:
                this._jobStatus = SowJobStates.walkingToField;
                if (this._character.building.doorPosition.x === this._character.position.x &&
                    this._character.building.doorPosition.z === this._character.position.z &&
                    !this._isCharacterWalking && !this._isCharacterAtStart) {
                    console.log('go to field');
                    const toFieldPath = Map_1.default.findRunnablePath(this._character.position.position, this._targetFieldPosition, true);
                    console.log(toFieldPath);
                    this._character.walkByPath(toFieldPath);
                    this._isCharacterWalking = true;
                    this._currentStep++;
                }
                break;
            // Sow field
            case 2:
                if (this._character.position.x === this._targetFieldPosition.x &&
                    this._character.position.z === this._targetFieldPosition.z &&
                    SowJobStates.walkingToField === this._jobStatus) {
                    this._jobStatus = SowJobStates.sow;
                    this._isCharacterWalking = false;
                    console.log('sow timeout start');
                    setTimeout(() => {
                        if (2 !== this._currentStep) {
                            return;
                        }
                        this._field.sow();
                        console.log('sow');
                        this._currentStep++;
                    }, 12000 / gameSettings_1.GAME_SPEED);
                }
                break;
            // Back to farm
            case 3:
                this._jobStatus = SowJobStates.walkingToBuilding;
                const toBuildingPath = Map_1.default.findRunnablePath(this._character.position.position, this._character.building.doorPosition);
                this._character.walkByPath(toBuildingPath);
                this._isCharacterWalking = true;
                this._currentStep++;
                break;
            case 4:
                if (this._character.position.x === this._character.building.doorPosition.x &&
                    this._character.position.z === this._character.building.doorPosition.z) {
                    this._character.job = null;
                    this._character.building.sowDone();
                    this._currentStep++;
                    this._jobStatus = SowJobStates.notStarted;
                }
                break;
        }
    }
}
exports.default = Sow;
//# sourceMappingURL=Sow.js.map