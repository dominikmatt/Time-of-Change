"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Job {
    constructor() {
        this._inProgress = false;
        this._isFinished = true;
    }
    getType() {
        return this._type;
    }
    startJob() {
        this._inProgress = true;
    }
    get inProgress() {
        return this._inProgress;
    }
    get isFinished() {
        return this._isFinished;
    }
}
exports.default = Job;
//# sourceMappingURL=Job.js.map