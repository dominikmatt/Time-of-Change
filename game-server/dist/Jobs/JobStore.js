"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JobStore {
    constructor(player) {
        this._player = player;
    }
    addJob(job) {
        this._player.db.rpush(`jobs:${job.getType()}`, job.toJSON());
        // Remove job from ram.
        job = null;
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