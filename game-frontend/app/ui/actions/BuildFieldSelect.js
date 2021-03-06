"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BABYLON = require("babylonjs");
const Game_1 = require("../../Game");
const connection_1 = require("../../services/connection");
const DOMEvent_1 = require("../../services/DOMEvent");
const BuildingUpdateCommand_1 = require("../../Commands/BuildingUpdateCommand");
class BuildFieldSelect {
    constructor() {
        this.pickResult = null;
        this.load();
        this.bindDOMEvents();
    }
    bindDOMEvents() {
        DOMEvent_1.event.addEventListener('mousemove.build-building', this.onMouseMove.bind(this));
        DOMEvent_1.event.addEventListener('click.build-building', this.onMapClick.bind(this));
    }
    load() {
        BABYLON.SceneLoader.ImportMeshAsync(null, 'assets/models/fields/', 'acre.babylon', Game_1.default.gameScene.scene)
            .then((result) => {
            this._mesh = result.meshes[0];
            this._mesh.checkCollisions = true;
            this._mesh.material.alpha = 0.4;
        });
    }
    /**
     * This method will send the build event after a click on the map has been triggered.
     */
    onMapClick() {
        if (!this.pickResult || !this._buildable) {
            return;
        }
        connection_1.default.socket.emit('field.create', {
            position: {
                x: this.pickResult.pickedPoint.x,
                y: 0,
                z: this.pickResult.pickedPoint.z
            }
        });
        DOMEvent_1.event.removeEventListener('mousemove.build-building');
        DOMEvent_1.event.removeEventListener('click.build-building');
        this._mesh.dispose();
    }
    /**
     * This method will updated the mesh position after the mouse has been moved.
     */
    onMouseMove() {
        // We try to pick an object
        const pickResult = Game_1.default.gameScene.scene.pick(Game_1.default.gameScene.scene.pointerX, Game_1.default.gameScene.scene.pointerY);
        this._buildable = false;
        if (pickResult && pickResult.pickedPoint) {
            const obj = Object;
            const material = this._mesh.material;
            let hasCollision = false;
            this.pickResult = pickResult;
            this._mesh.position.x = pickResult.pickedPoint.x;
            this._mesh.position.y = 0;
            this._mesh.position.z = pickResult.pickedPoint.z;
            obj.entries(BuildingUpdateCommand_1.builtBuildings).forEach((buildings) => {
                const mesh = buildings[1]._mesh;
                if (true === this._mesh.intersectsMesh(mesh, false)) {
                    hasCollision = true;
                }
            });
            // @ts-ignore
            if (true === hasCollision) {
                material.emissiveColor = new BABYLON.Color3(1, 0, 0);
                material.diffuseColor = new BABYLON.Color3(1, 0, 0);
            }
            else {
                this._buildable = true;
                material.emissiveColor = new BABYLON.Color3(0, 0, 0);
                material.diffuseColor = new BABYLON.Color3(0, 0, 0);
            }
        }
    }
}
exports.default = BuildFieldSelect;
//# sourceMappingURL=BuildFieldSelect.js.map