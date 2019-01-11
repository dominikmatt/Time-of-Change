"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Character_1 = __importDefault(require("../Character"));
const TransportJob_1 = __importDefault(require("../../Jobs/types/TransportJob"));
const TransportToStorehouseJob_1 = __importDefault(require("../../Jobs/types/TransportToStorehouseJob"));
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
            // No Storehouse found with resource append job to job-list.
            if (null === job) {
                return;
            }
            if (true === job.toStore) {
                const building = this._player.buildingManager.findProductionBuildingById(job.building);
                this._job = new TransportToStorehouseJob_1.default(this._player, job.resourceType, building, this);
                this._walkTarget = job.startPosition;
                return;
            }
            const targetBuilding = this._player.buildingManager.findBuildingById(job.targetBuilding);
            const building = this._player.buildingManager.findNearestStorehouseWithResource(job.resourceType, this.position.position);
            let startPosition = job.startPosition;
            if (!building) {
                this._player.jobStore.addJob(new TransportJob_1.default(this._player, startPosition, job.resourceType, targetBuilding));
            }
            this._job = new TransportJob_1.default(this._player, building.doorPosition, job.resourceType, targetBuilding, this, building);
            this._walkTarget = startPosition;
            // No Storehouse found with resource append job to job-list.
            if (!building) {
                this._player.jobStore.addJob(this._job);
                this._job = null;
                this._walkTarget = null;
            }
        })
            .catch((error) => {
            console.log(error);
        });
    }
}
exports.default = Serf;
//# sourceMappingURL=Serf.js.map