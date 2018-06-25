"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: implement with redits.
class JobStore {
    constructor() {
        this._jobs = [];
    }
    static get Instance() {
        return this.instance || (this.instance = new this());
    }
    addJob(job) {
        this._jobs.push(job);
    }
    getFreeJobByType(jobType) {
    }
    update() {
        this._jobs.forEach((job, index) => {
            if (job.isFinished) {
                console.log('remove', index);
            }
        });
    }
}
exports.default = JobStore.Instance;
//# sourceMappingURL=JobStore.js.map