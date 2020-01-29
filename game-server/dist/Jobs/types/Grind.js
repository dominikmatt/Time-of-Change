"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = __importDefault(require("../Job"));
const gameSettings_1 = require("../../gameSettings");
class Grind extends Job_1.default {
    constructor(player, character) {
        super(player);
        this._type = 'grind';
        this._character = null;
        this._isWorking = false;
        this._character = character;
    }
    beforeDestroy() { }
    toJSON() {
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
        });
    }
    update() {
        switch (this._currentStep) {
            case 0:
                if (this._character && this._character.isInHouse) {
                    this._currentStep++;
                }
                break;
            case 1:
                if (false === this._isWorking) {
                    this._character.building.decreaseCornStore();
                    this._isWorking = true;
                    this._reAddOnDestroy = false;
                }
                setTimeout(() => {
                    this._currentStep++;
                }, 5000 / gameSettings_1.GAME_SPEED);
                break;
            case 2:
                this._character.job = null;
                this._isWorking = false;
                this._character.building.increaseFlourStore();
                this._currentStep++;
                break;
        }
    }
}
exports.default = Grind;
//# sourceMappingURL=Grind.js.map