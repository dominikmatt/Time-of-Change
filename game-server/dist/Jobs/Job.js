"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Job {
    constructor(player) {
        this._id = uuid_1.v1();
        /**
         * If this property is true the job will be readded to the list when the working-character is killed.
         */
        this._reAddOnDestroy = true;
        this._inProgress = false;
        this._isFinished = true;
        this._currentStep = 0;
        this._player = player;
    }
    destroy() {
        this.beforeDestroy();
        this._currentStep = 0;
        this._inProgress = false;
    }
    getType() {
        return this._type;
    }
    addToDb() {
        throw new Error('Job: Implement addToDb method.');
    }
    beforeDestroy() {
        //throw new Error('Job: Implement beforeDestroy method.');
    }
    toJSON() {
        throw new Error('Job: Implement toJSON method.');
    }
    update() {
        throw new Error('Job: Implement update method.');
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
    get reAddOnDestroy() {
        return this._reAddOnDestroy;
    }
    get currentStep() {
        return this._currentStep;
    }
}
exports.default = Job;
//# sourceMappingURL=Job.js.map