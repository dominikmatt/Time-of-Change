"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./Game");
const connection_1 = require("./services/connection");
const BABYLON = require("babylonjs");
class Terrain {
    constructor() {
        this._game = Game_1.default;
        BABYLON.SceneLoader.ImportMesh('', 'maps/flat/', 'flat.babylon', this._game.gameScene.scene, (meshes) => {
            this._mesh = meshes[0];
            this._mesh.position.x = 0;
            this._mesh.position.z = 0;
            this._mesh.setPivotMatrix(BABYLON.Matrix.Translation(-8, 0, -8));
            this._mesh.material.wireframe = true;
            this.generateHeightData();
            connection_1.default.socket.emit('map.data');
        });
    }
    /**
     * Generate the height data of the map.
     * TODO: Move it to a helper class and store it to a json file.
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
    getHeight(x, z) {
        return (this._heightData[x][z] + this._heightData[x + 1][z + 1] + this._heightData[x][z + 1] + this._heightData[x + 1][z]) / 4;
    }
}
exports.default = Terrain;
//# sourceMappingURL=Terrain.js.map