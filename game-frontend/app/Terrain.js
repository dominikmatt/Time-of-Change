"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Building_1 = require("./Buildings/Building");
class Terrain {
    constructor(game) {
        this._game = game;
        BABYLON.SceneLoader.ImportMesh('', 'maps/flat/', 'flat.babylon', this._game.scene, (meshes, x, materials) => {
            console.log(meshes);
            meshes.forEach((mesh) => {
                mesh.position.x = mesh.scaling.x;
                mesh.position.z = -(mesh.scaling.z);
                mesh.rotation.y = Math.PI / 2;
                mesh.material.wireframe = false;
            });
        });
        const building = new Building_1.default(this._game, {
            x: 5,
            y: 0,
            z: 5,
        });
        const building1 = new Building_1.default(this._game, {
            x: 9,
            y: 0,
            z: 9,
        });
    }
}
exports.default = Terrain;
//# sourceMappingURL=Terrain.js.map