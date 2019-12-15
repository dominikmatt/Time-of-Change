"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const PositionComponent_1 = require("../Components/PositionComponent");
const Map_1 = __importDefault(require("../Map/Map"));
class Field {
    constructor(fieldData, player) {
        this._id = uuid_1.v1();
        this._building = null;
        this._position = new PositionComponent_1.PositionComponent(fieldData.position);
        this.updateMap();
    }
    updateMap() {
        Map_1.default.updateCoordinate(this._position.x, this._position.z, {
            runnable: false,
            building: null,
            hasField: true,
            hasTree: false,
            hasStone: false,
        });
    }
    get id() {
        return this._id;
    }
    get building() {
        return this._building;
    }
    set building(value) {
        this._building = value;
    }
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
    }
}
exports.default = Field;
//# sourceMappingURL=Field.js.map