"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../Game");
const AssetsManager_1 = require("../AssetsManager");
class Character {
    constructor(id, position) {
        this._position = position;
        this._id = id;
        this.load();
    }
    set position(position) {
        this._position = position;
        this.setPosition();
    }
    /**
     * Load character and place it to the scene.
     */
    load() {
        this._mesh = AssetsManager_1.default.getCharacterMeshByName('character', this._id);
        this._mesh.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
        this.setPosition();
        Game_1.default.gameScene.shadowGenerator.getShadowMap().renderList.push(this._mesh);
        // Show meshes.
        this._mesh.isVisible = true;
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