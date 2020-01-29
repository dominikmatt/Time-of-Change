"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Character_1 = __importDefault(require("../Character"));
class Farmer extends Character_1.default {
    getType() {
        return 'farmer';
    }
    getBuildingType() {
        return 'farm';
    }
    getNeedBuilding() {
        return true;
    }
    getCharacterData() {
        return {};
    }
    findJob() {
        if (null === this._building.nextJob) {
            return;
        }
        this._walkTarget = this._building.doorPosition;
        this._building.nextJob.character = this;
        this._job = this._building.nextJob;
    }
}
exports.default = Farmer;
//# sourceMappingURL=Farmer.js.map