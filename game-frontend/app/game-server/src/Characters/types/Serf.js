"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Character_1 = require("../Character");
const TransportJob_1 = require("../../Jobs/types/TransportJob");
const TransportToStorehouseJob_1 = require("../../Jobs/types/TransportToStorehouseJob");
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
            const building = this._player.buildingManager.findStorehouseWithResource(job.resourceType);
            const targetBuilding = this._player.buildingManager.findBuildingById(job.targetBuilding);
            let startPosition = job.startPosition;
            this._job = new TransportJob_1.default(this._player, building.doorPosition, job.resourceType, targetBuilding, this, building);
            this._walkTarget = startPosition;
            // No Storehouse found with resource append job to job-list.
            if (!building) {
                this._player.jobStore.addJob(this._job);
                this._job = null;
                this._walkTarget = null;
            }
        });
    }
}
exports.default = Serf;
//# sourceMappingURL=Serf.js.map