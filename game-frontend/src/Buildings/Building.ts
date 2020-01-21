import * as BABYLON from 'babylonjs'
import {default as game} from "../Game";
import PositionInterface from "../interfaces/PositionInterface";
import assetsManager from "../AssetsManager";

interface ColorsInterface {
    [key:string]: any;
};

export default class Building {
    private readonly _position: PositionInterface;
    protected _mesh: BABYLON.AbstractMesh;
    protected _banner: BABYLON.AbstractMesh = null;
    protected _playerId: number;
    protected readonly _positionFixture: PositionInterface = {
        x: 0,
        y: 0,
        z: 0
    };
    protected asset: string = '';
    private _key: string;
    private _id: string;

    constructor(id: string, position: PositionInterface, key: string, playerId: number) {
        this._id = id;
        this._position = position;
        this._key = key;
        this._playerId = playerId;

        this.load();
    }

    /**
     * Load Building and add to the scene.
     */
    private load() {
        this._mesh = assetsManager.getBuildingMeshByName(this._key, this._id);
        this._banner = this._mesh.getChildMeshes()[0];
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

        game.gameScene.shadowGenerator.getShadowMap().renderList.push(this._mesh);

        // Show meshes.
        this._mesh.isVisible = true;
        this._banner.isVisible = true;
    }

    private setPosition() {
        this._mesh.position = BABYLON.Vector3.Zero();
        this._mesh.position.x = this._position.x - this._positionFixture.x;
        this._mesh.position.y = game.gameScene.terrain.getHeight(this._position.x, this._position.z);
        this._mesh.position.z = this._position.z - this._positionFixture.z;
    }

    private setBannerMaterial() {
        const material: BABYLON.StandardMaterial = new BABYLON.StandardMaterial(
            'banner-material',
            game.gameScene.scene
        );

        //TODO: Move to a global settings.
        const colors: ColorsInterface = {
            1: [1, 0, 0],
            2: [0, 1, 0],
            3: [0, 0, 1],
            4: [1, 1, 1]
        };

        material.diffuseColor = new BABYLON.Color3(
            colors[this._playerId][0],
            colors[this._playerId][1],
            colors[this._playerId][2]
        );
        material.specularColor = new BABYLON.Color3(0, 0, 0);

        this._banner.material = material;
    }

    public setHealt(currentHealth: number, maxHealth: number) {
        if (!this._mesh) {
            return;
        }

        if (maxHealth === 0) {
            maxHealth = 1;
        }

        this._mesh.metadata.isReady = currentHealth === maxHealth;

        this._mesh.position.y = game.gameScene.terrain.getHeight(this._position.x, this._position.z) + (currentHealth / maxHealth - 1);
    }
}
