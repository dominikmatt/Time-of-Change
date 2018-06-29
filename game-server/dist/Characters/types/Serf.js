"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Character_1 = __importDefault(require("../Character"));
const TransportJob_1 = __importDefault(require("../../Jobs/types/TransportJob"));
class Serf extends Character_1.default {
    getType() {
        return 'serf';
    }
    getCharacterData() {
        return {};
    }
    findJob() {
        this._player.jobStore.getFreeJobByType('transport')
            .then((job) => {
            const building = this._player.buildingManager.findStorehouseWithResource(job.resourceType);
            let startPosition = job.startPosition;
            if (building) {
                startPosition = building.doorPosition;
            }
            this._job = new TransportJob_1.default(this._player, startPosition, job.resourceType, this);
            this._walkTarget = startPosition;
            // No Storehouse found with resource append job to job-list.
            if (!building) {
                this._player.jobStore.addJob(this._job);
                this._job = null;
                this._walkTarget = [];
            }
        });
    }
}
exports.default = Serf;
//# sourceMappingURL=Serf.js.map