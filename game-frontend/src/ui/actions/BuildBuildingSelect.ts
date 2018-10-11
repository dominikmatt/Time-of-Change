import game from "../../Game";
import connectionService from "../../services/connection";
import {event} from "../../services/DOMEvent";
import PickingInfo = BABYLON.PickingInfo;
import Nullable = BABYLON.Nullable;

export default class BuildBuildingSelect {
    private pickResult: Nullable<PickingInfo>;
    private _mesh: BABYLON.AbstractMesh;
    private _buildable: boolean;

    constructor() {
        this.pickResult = null;
        this.load();

        this.bindDOMEvents();
    }

    bindDOMEvents() {
        event.addEventListener('mousemove.build-building', this.onMouseMove.bind(this));
        event.addEventListener('click.build-building', this.onMapClick.bind(this));
    }

    private load() {
        BABYLON.SceneLoader.ImportMeshAsync(
            null,
            'assets/models/buildings/',
            'schoolhouse.babylon',
            game.gameScene.scene)
            .then((result) => {
                this._mesh = result.meshes[0];
            });
    }

    /**
     * This method will send the build event after a click on the map has been triggered.
     */
    onMapClick() {
        if (!this.pickResult || !this._buildable) {
            return;
        }

        connectionService.socket.emit('building.create', {
            type: 'schoolhouse',
            position: {
                x: this.pickResult.pickedPoint.x,
                y: 0,
                z: this.pickResult.pickedPoint.z
            }
        });

        event.removeEventListener('mousemove.build-building');
        event.removeEventListener('click.build-building');

        this._mesh.dispose();
    }

    /**
     * This method will updated the mesh position after the mouse has been moved.
     */
    onMouseMove() {
        // We try to pick an object
        var pickResult = game.gameScene.scene.pick(game.gameScene.scene.pointerX, game.gameScene.scene.pointerY);
        this._buildable = false;

        if (pickResult) {
            this.pickResult = pickResult;
            this._mesh.material.alpha = 0.4;
            this._mesh.position.x = pickResult.pickedPoint.x;
            this._mesh.position.y = 0;
            this._mesh.position.z = pickResult.pickedPoint.z;

            console.log(this.pickResult.pickedMesh);
            if ('Plane' === this.pickResult.pickedMesh.name) {
                this._buildable = true;
                this._mesh.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
                this._mesh.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
            } else {
                this._mesh.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
                this._mesh.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
            }
        }
    }
}
