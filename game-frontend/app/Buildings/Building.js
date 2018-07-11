"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Building {
    constructor(game, position) {
        this._positionFixture = {
            x: 1,
            y: 0,
            z: -1
        };
        this._game = game;
        this._position = position;
        this.load();
    }
    load() {
        BABYLON.SceneLoader.ImportMeshAsync(null, 'assets/buildings/', 'storehouse.babylon', this._game.scene)
            .then((result) => {
            this._mesh = result.meshes[0];
            this.setPosition();
        });
    }
    setPosition() {
        this._mesh.position = BABYLON.Vector3.Zero();
        this._mesh.position.x = this._position.x + this._positionFixture.x;
        this._mesh.position.z = -(this._position.z) + this._positionFixture.z;
    }
}
exports.default = Building;
//# sourceMappingURL=Building.js.map