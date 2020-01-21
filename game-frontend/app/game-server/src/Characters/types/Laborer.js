"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Character_1 = require("../Character");
const BuildJob_1 = require("../../Jobs/types/BuildJob");
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