"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = __importDefault(require("../Job"));
class TransportJob extends Job_1.default {
    constructor(resourceType) {
        super();
        this._type = 'transport';
        this._resourceType = '';
        this._resourceType = resourceType;
    }
}
exports.default = TransportJob;
//# sourceMappingURL=TransportJob.js.map