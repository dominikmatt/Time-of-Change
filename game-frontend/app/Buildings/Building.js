"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BABYLON = require("babylonjs");
const Game_1 = require("../Game");
const AssetsManager_1 = require("../AssetsManager");
;
class Building {
    constructor(id, position, key, playerId) {
        this._banner = null;
        this._positionFixture = {
            x: 0,
            y: 0,
            z: 0
        };
        this.asset = '';
        this._id = id;
        this._position = position;
        this._key = key;
        this._playerId = playerId;
        this.load();
    }
    /**
     * Load Building and add to the scene.
     */
    load() {
        this._mesh = AssetsManager_1.default.getBuildingMeshByName(this._key, this._id);
        //this._banner = this._mesh.getChildMeshes()[0];
        this._mesh.checkCollisions = true;
        this._mesh.metadata = {
            key: this._key,
            isBuilding: true,
            buildingId: this._id,
        };
        this.setPosition();
        if (this._banner) {
            this.setBannerMaterial();
        }
        Game_1.default.gameScene.shadowGenerator.getShadowMap().renderList.push(this._mesh);
        // Show meshes.
        this._mesh.isVisible = true;
        //this._banner.isVisible = true;
    }
    setPosition() {
        this._mesh.position = BABYLON.Vector3.Zero();
        this._mesh.position.x = this._position.x - this._positionFixture.x;
        this._mesh.position.y = Game_1.default.gameScene.terrain.getHeight(this._position.x, this._position.z);
        this._mesh.position.z = this._position.z - this._positionFixture.z;
    }
    setBannerMaterial() {
        const material = new BABYLON.StandardMaterial('banner-material', Game_1.default.gameScene.scene);
        //TODO: Move to a global settings.
        const colors = {
            1: [1, 0, 0],
            2: [0, 1, 0],
            3: [0, 0, 1],
            4: [1, 1, 1]
        };
        material.diffuseColor = new BABYLON.Color3(colors[this._playerId][0], colors[this._playerId][1], colors[this._playerId][2]);
        material.specularColor = new BABYLON.Color3(0, 0, 0);
        this._banner.material = material;
    }
    setHealt(currentHealth, maxHealth) {
        if (!this._mesh) {
            return;
        }
        if (maxHealth === 0) {
            maxHealth = 1;
        }
        this._mesh.metadata.isReady = currentHealth === maxHealth;
        this._mesh.position.y = Game_1.default.gameScene.terrain.getHeight(this._position.x, this._position.z) + (currentHealth / maxHealth - 1);
    }
}
exports.default = Building;
//# sourceMappingURL=Building.js.map