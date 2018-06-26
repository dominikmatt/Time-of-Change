"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Job {
    constructor(player) {
        this._id = uuid_1.v1();
        this._inProgress = false;
        this._isFinished = true;
        this._player = player;
    }
    getType() {
        return this._type;
    }
    addToDb() {
        throw new Error('Job: Implement addToDb method.');
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
    get id() {
        return this._id;
    }
}
exports.default = Job;
//# sourceMappingURL=Job.js.map