"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../Game");
class Character {
    constructor(position) {
        this._positionFixture = {
            x: 0,
            y: -5,
            z: 0
        };
        this._position = position;
        this.load();
    }
    set position(position) {
        this._position = position;
        this.setPosition();
    }
    load() {
        BABYLON.SceneLoader.ImportMeshAsync(null, 'assets/models/characters/', 'character1.babylon', Game_1.default.gameScene.scene)
            .then((result) => {
            this._mesh = result.meshes[0];
            this._mesh.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
            this.setPosition();
        });
    }
    setPosition() {
        if (!this._mesh) {
            return;
        }
        this._mesh.position = BABYLON.Vector3.Zero();
        this._mesh.position.x = this._position.x;
        this._mesh.position.y = Game_1.default.gameScene.terrain.getHeight(this._position.x, this._position.z, true);
        this._mesh.position.z = this._position.z;
    }
    setHealt(currentHealth, maxHealth) {
        if (!this._mesh) {
            return;
        }
        if (maxHealth === 0) {
            maxHealth = 1;
        }
        this._mesh.position.y = currentHealth / maxHealth - 1;
    }
}
exports.default = Character;
//# sourceMappingURL=Character.js.map