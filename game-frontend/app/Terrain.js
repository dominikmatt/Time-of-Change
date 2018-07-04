"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Terrain {
    constructor(game) {
        this._game = game;
        BABYLON.SceneLoader.ImportMesh("spaceship", "maps/slishou/", "slishou.babylon", this._game.scene, function (newMeshes, particleSystems) {
            console.log(particleSystems);
        });
    }
}
exports.default = Terrain;
//# sourceMappingURL=Terrain.js.map