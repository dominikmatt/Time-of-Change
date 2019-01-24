"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Character_1 = __importDefault(require("../Character"));
class Stonemason extends Character_1.default {
    getType() {
        return 'stonemason';
    }
    getBuildingType() {
        return 'quarry';
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
        this._job = this._building.nextJob;
    }
}
exports.default = Stonemason;
//# sourceMappingURL=Stonemason.js.map