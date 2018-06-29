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
            console.log(job);
            this._job = new TransportJob_1.default(this._player, job.startPosition, job.resourceType, this);
        });
    }
}
exports.default = Serf;
//# sourceMappingURL=Serf.js.map