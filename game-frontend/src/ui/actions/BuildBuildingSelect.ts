import * as BABYLON from 'babylonjs'
import game from "../../Game";
import connectionService from "../../services/connection";
import {event} from "../../services/DOMEvent";
import PickingInfo = BABYLON.PickingInfo;
import Nullable = BABYLON.Nullable;
import {builtBuildings} from "../../Commands/BuildingUpdateCommand";
import AbstractMesh = BABYLON.AbstractMesh;
import StandardMaterial = BABYLON.StandardMaterial;

export default class BuildBuildingSelect {
    private pickResult: Nullable<PickingInfo>;
    private _mesh: BABYLON.AbstractMesh;
    private _buildable: boolean;
    private _type: string;

    constructor(type: string) {
        this.pickResult = null;
        this._type = type;
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

        connectionService.socket.emit('building.create', {
            type: this._type,
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

        if (pickResult && pickResult.pickedPoint) {
            const obj = <any>Object;
            const material: StandardMaterial = <StandardMaterial>this._mesh.material;
            let hasCollision = false;
            this.pickResult = pickResult;

            this._mesh.position.x = pickResult.pickedPoint.x;
            this._mesh.position.y = 0;
            this._mesh.position.z = pickResult.pickedPoint.z;

            obj.entries(builtBuildings).forEach((buildings: any) => {
                const mesh: AbstractMesh = buildings[1]._mesh;

                if (true === this._mesh.intersectsMesh(mesh, false)) {
                    hasCollision = true;
                }
            });

            // @ts-ignore
            if (true === hasCollision) {
                material.emissiveColor = new BABYLON.Color3(1, 0, 0);
                material.diffuseColor = new BABYLON.Color3(1, 0, 0);
            } else {
                this._buildable = true;
                material.emissiveColor = new BABYLON.Color3(0, 0, 0);
                material.diffuseColor = new BABYLON.Color3(0, 0, 0);
            }
        }
    }
}
