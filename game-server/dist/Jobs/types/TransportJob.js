"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = __importDefault(require("../Job"));
class TransportJob extends Job_1.default {
    constructor(player, resourceType) {
        super(player);
        this._type = 'transport';
        this._resourceType = '';
        this._resourceType = resourceType;
    }
    addToDb() {
        console.log('add', this._id);
        this._player.db.hset(`job:${this._id}`, 'resourceType', this._resourceType);
    }
}
exports.default = TransportJob;
//# sourceMappingURL=TransportJob.js.map