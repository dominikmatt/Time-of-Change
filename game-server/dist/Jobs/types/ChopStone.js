"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = __importDefault(require("../Job"));
const Map_1 = __importDefault(require("../../Map/Map"));
const gameSettings_1 = require("../../gameSettings");
class ChopStone extends Job_1.default {
    constructor(player, targetStonePosition, character) {
        super(player);
        this._type = 'chopStone';
        this._character = null;
        this._isCharacterWalking = false;
        this._isCharacterAtStart = false;
        this._targetStonePosition = targetStonePosition;
        this._character = character;
    }
    toJSON() {
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
            targetStonePosition: this._targetStonePosition,
        });
    }
    update() {
        switch (this._currentStep) {
            case 0:
                if (!this._isCharacterWalking && !this._isCharacterAtStart) {
                    const path = Map_1.default.findRunnablePath(this._character.position.position, this._targetStonePosition, true);
                    this._character.walkByPath(path);
                    this._isCharacterWalking = true;
                    this._currentStep++;
                }
                break;
            case 1:
                if (this._character.position.x === this._targetStonePosition.x &&
                    this._character.position.z === this._targetStonePosition.z) {
                    this._isCharacterWalking = false;
                    setTimeout(() => {
                        if (1 !== this._currentStep) {
                            return;
                        }
                        Map_1.default.updateCoordinate(this._targetStonePosition.x, this._targetStonePosition.z, {
                            hasTree: false,
                            runnable: true
                        });
                        this._currentStep++;
                    }, 5000 / gameSettings_1.GAME_SPEED);
                }
                break;
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
exports.default = ChopStone;
//# sourceMappingURL=ChopStone.js.map