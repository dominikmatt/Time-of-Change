"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class PositionComponent {
    constructor(position) {
        this._position = {
            x: 0,
            y: 0,
            z: 0
        };
        this._position = position;
    }
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
    }
    get x() {
        return this.position.x;
    }
    get y() {
        return this.position.y;
    }
    get z() {
        return this.position.z;
    }
}
exports.PositionComponent = PositionComponent;
//# sourceMappingURL=PositionComponent.js.map