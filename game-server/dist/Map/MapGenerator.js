"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Plant trees on the map.
 */
class MapGenerator {
    constructor(map) {
        this._map = map;
    }
    generate() {
        const rawTreeMatrix = require('./maps/slishou/tree-matrix.js');
        const rawRunnableMatrix = require('./maps/slishou/runnable-matrix.js');
        for (let x = 0; x < this._map.xMax; x++) {
            for (let z = 0; z < this._map.zMax; z++) {
                if ('undefined' === typeof rawRunnableMatrix[x][z]) {
                    rawRunnableMatrix[x][z] = rawRunnableMatrix[x - 1][z];
                }
                const hasTree = 3 === Math.floor(Math.random() * 10) && rawRunnableMatrix[x][z];
                if ('undefined' === typeof rawTreeMatrix[x][z]) {
                    rawTreeMatrix[x][z] = hasTree;
                }
                else {
                    rawTreeMatrix[x][z] = hasTree;
                }
                this._map.updateCoordinate(x, z, {
                    x,
                    z,
                    runnable: !!(!rawTreeMatrix[x][z] && rawRunnableMatrix[x][z]),
                    street: false,
                    resourceKey: 'grass',
                    hasTree: rawTreeMatrix[x][z] || false
                });
            }
        }
    }
}
exports.default = MapGenerator;
//# sourceMappingURL=MapGenerator.js.map