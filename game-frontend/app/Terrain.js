"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./Game");
const connection_1 = require("./services/connection");
const BABYLON = require("babylonjs");
const AssetsManager_1 = require("./AssetsManager");
class Terrain {
    constructor() {
        this._game = Game_1.default;
        this._mesh = AssetsManager_1.default.getTerrainMeshByName('terrain');
        console.log(this._mesh);
        this._mesh.position.x = 0;
        this._mesh.position.z = 0;
        this._mesh.setPivotMatrix(BABYLON.Matrix.Translation(-8, 0, -8));
        this._mesh.material.wireframe = false;
        this._mesh.metadata = {
            key: 'map',
        };
        this._mesh.receiveShadows = true;
        this._mesh.isVisible = true;
        this.generateHeightData();
        connection_1.default.socket.emit('map.data');
    }
    /**
     * Generate the height data of the map.
     * TODO: Move it to a helper class and store it to a json file.
     *
     const coordinates = [];
     const trunkVerts = ground.geometry.getVerticesData(BABYLON.VertexBuffer.PositionKind);
     for (var i = 0; i < trunkVerts.length; i += 3) {
         const coordinate = {x: trunkVerts[i], y: trunkVerts[i + 1], z: trunkVerts[i + 2]};

         coordinates.push(coordinate);
     }

     */
    generateHeightData() {
        const heightData = {};
        const positions = this._mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        for (let i = 0; i < positions.length; i += 3) {
            const x = Math.round(positions[i]);
            const y = positions[i + 1];
            const z = Math.round(positions[i + 2]);
            if (!heightData[x]) {
                heightData[x] = {};
            }
            heightData[x][z] = y;
        }
        this._heightData = heightData;
    }
    /**
     * Returns the height of given coordinate.
     *
     * @return {number}
     */
    getHeight(x, z, middle = false) {
        if (!this._heightData[x])
            this._heightData[x] = [];
        if (!this._heightData[x + 1])
            this._heightData[x] = [];
        let heightData = [
            this._heightData[x][z],
            this._heightData[x + 1][z + 1],
            this._heightData[x][z + 1],
            this._heightData[x + 1][z]
        ];
        heightData = heightData.filter((height) => {
            return 0 === height || height;
        });
        if (true === middle) {
            return heightData.reduce((p, c) => p + c, 0) / heightData.length;
        }
        return Math.min.apply(Math, heightData);
    }
    get mesh() {
        return this._mesh;
    }
}
exports.default = Terrain;
//# sourceMappingURL=Terrain.js.map