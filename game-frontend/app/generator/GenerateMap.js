"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../Game");
const connection_1 = require("../services/connection");
class GenerateMap {
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
}
exports.default = GenerateMap;
//# sourceMappingURL=GenerateMap.js.map