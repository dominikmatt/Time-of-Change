"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const PositionComponent_1 = require("../Components/PositionComponent");
const Map_1 = require("../Map/Map");
var FieldStates;
(function (FieldStates) {
    FieldStates[FieldStates["RAW"] = 1] = "RAW";
    FieldStates[FieldStates["GROWING"] = 2] = "GROWING";
    FieldStates[FieldStates["MATURE"] = 3] = "MATURE";
})(FieldStates || (FieldStates = {}));
class Field {
    constructor(fieldData, player) {
        this._id = uuid_1.v1();
        this._building = null;
        this._status = FieldStates.RAW; // In percent.
        this._progress = 0; // In percent.
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
    isRaw() {
        return FieldStates.RAW === this._status;
    }
    isReadyToHarvest() {
        return FieldStates.MATURE === this._status;
    }
    sow() {
        if (FieldStates.RAW === this._status) {
            this._status = FieldStates.GROWING;
            return true;
        }
        return false;
    }
    harvest() {
        if (FieldStates.MATURE === this._status) {
            this._status = FieldStates.RAW;
            this._progress = 0;
            return true;
        }
        return false;
    }
    update(delta) {
        if (FieldStates.GROWING === this._status) {
            this._progress += delta;
        }
        if (100 <= this._progress) {
            this._status = FieldStates.MATURE;
        }
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
    get progress() {
        return this._progress;
    }
    get status() {
        return this._status;
    }
    toObject() {
        return {
            _id: this._id,
            status: this._status,
            progress: this._progress,
            player: this._player.token,
            position: this._position.position,
        };
    }
}
exports.default = Field;
//# sourceMappingURL=Field.js.map