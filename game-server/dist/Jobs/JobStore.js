"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coordinates_1 = require("../utils/coordinates");
class JobStore {
    constructor(player) {
        this._player = player;
    }
    addJob(job) {
        this._player.db.rpush(`jobs:${job.getType()}`, job.toJSON());
        // Remove job from ram.
        job = null;
    }
    /**
     * TODO: Remove given job from store.
     *
     * @param jobType
     * @param position
     */
    getNearestFreeJobByType(jobType, position) {
        console.log(position);
        return new Promise((resolve, reject) => {
            let nearestDistance = 0;
            let nearestJob = null;
            this._player.db.lrange(`jobs:${jobType}`, 0, 10)
                .then((data) => {
                data.forEach((jobJSON) => {
                    const job = JSON.parse(jobJSON);
                    if (!job.startPosition) {
                        return true;
                    }
                    const distance = coordinates_1.getDistanceFromPoints(job.startPosition, position);
                    if (null === nearestJob || nearestDistance > distance) {
                        nearestDistance = job.startPosition;
                        nearestJob = job;
                    }
                });
                console.log(nearestJob);
                resolve(nearestJob);
            })
                .catch((error) => {
                throw new Error(error);
            });
        });
    }
    getFreeJobByType(jobType) {
        return new Promise((resolve, reject) => {
            this._player.db.lpop(`jobs:${jobType}`)
                .then((data) => {
                resolve(JSON.parse(data));
            })
                .catch((error) => {
                throw new Error(error);
            });
        });
    }
    update() {
    }
}
exports.default = JobStore;
//# sourceMappingURL=JobStore.js.map