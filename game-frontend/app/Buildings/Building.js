"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../Game");
class Building {
    constructor(position) {
        this._positionFixture = {
            x: 1,
            y: 0,
            z: -1
        };
        this._position = position;
        this.load();
    }
    load() {
        BABYLON.SceneLoader.ImportMeshAsync(null, 'assets/models/buildings/', 'schoolhouse.babylon', Game_1.default.gameScene.scene)
            .then((result) => {
            this._mesh = result.meshes[0];
            this.setPosition();
        });
    }
    setPosition() {
        console.log(Game_1.default.gameScene.terrain.getHeight(this._position.x, this._position.z));
        this._mesh.position = BABYLON.Vector3.Zero();
        this._mesh.position.x = this._position.x;
        this._mesh.position.y = Game_1.default.gameScene.terrain.getHeight(this._position.x, this._position.z);
        this._mesh.position.z = this._position.z;
    }
    setHealt(currentHealth, maxHealth) {
        if (!this._mesh) {
            return;
        }
        if (maxHealth === 0) {
            maxHealth = 1;
        }
        this._mesh.position.y = Game_1.default.gameScene.terrain.getHeight(this._position.x, this._position.z) + (currentHealth / maxHealth - 1);
    }
}
exports.default = Building;
//# sourceMappingURL=Building.js.map