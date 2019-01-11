"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Character_1 = __importDefault(require("../Character"));
const BuildJob_1 = __importDefault(require("../../Jobs/types/BuildJob"));
class Laborer extends Character_1.default {
    getType() {
        return 'laborer';
    }
    getCharacterData() {
        return {};
    }
    findJob() {
        this._player.jobStore.getFreeJobByType('build')
            .then((job) => {
            // No Storehouse found with resource append job to job-list.
            if (null === job) {
                return;
            }
            const targetBuilding = this._player.buildingManager.findBuildingById(job.targetBuilding);
            this._job = new BuildJob_1.default(this._player, targetBuilding, this);
        })
            .catch((error) => {
            console.log(error);
        });
    }
}
exports.default = Laborer;
//# sourceMappingURL=Laborer.js.map