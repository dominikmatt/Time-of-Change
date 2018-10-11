"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xMax = 10;
const zMax = 10;
class MapGenerator {
    constructor(map) {
        this._map = map;
    }
    generate() {
        for (let x = 0; x < this._map.xMax; x++) {
            for (let z = 0; z < this._map.zMax; z++) {
                const hasTree = 3 === Math.floor(Math.random() * 10);
                this._map.updateCoordinate(x, z, {
                    x,
                    z,
                    runnable: !hasTree,
                    street: false,
                    resourceKey: 'grass',
                    hasTree
                });
            }
        }
    }
}
exports.default = MapGenerator;
//# sourceMappingURL=MapGenerator.js.map