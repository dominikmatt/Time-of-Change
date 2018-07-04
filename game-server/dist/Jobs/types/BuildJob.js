"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = __importDefault(require("../Job"));
class BuildJob extends Job_1.default {
    constructor(player, targetBuilding, character) {
        super(player);
        this._type = 'transport';
        this._character = null;
        this._targetBuilding = targetBuilding;
        this._character = character;
    }
    toJSON() {
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
            targetBuilding: this._targetBuilding.id
        });
    }
    update() {
    }
}
exports.default = BuildJob;
//# sourceMappingURL=BuildJob.js.map