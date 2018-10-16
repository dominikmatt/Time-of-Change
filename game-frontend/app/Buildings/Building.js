"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../Game");
const buildingMapping_1 = require("./buildingMapping");
class Building {
    constructor(position, key) {
        this._positionFixture = {
            x: 1,
            y: 0,
            z: -1
        };
        this.asset = '';
        this._position = position;
        this._key = key;
        this.load();
    }
    load() {
        BABYLON.SceneLoader.ImportMeshAsync(null, 'assets/models/buildings/', buildingMapping_1.default[this._key].asset, Game_1.default.gameScene.scene)
            .then((result) => {
            this._mesh = result.meshes[0];
            this._mesh.checkCollisions = true;
            this.setPosition();
        });
    }
    setPosition() {
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