import {default as game} from "../Game";
import PositionInterface from "../interfaces/PositionInterface";
import buildingMapping from "./buildingMapping";

export default class Building {
    private readonly _position: PositionInterface;
    protected _mesh: BABYLON.AbstractMesh;
    protected readonly _positionFixture: PositionInterface = {
        x: 0,
        y: 0,
        z: 0
    };
    protected asset: string = '';
    private _key: string;
    private _id: string;

    constructor(id: string, position: PositionInterface, key: string) {
        this._id = id;
        this._position = position;
        this._key = key;
        this.load();
    }

    private load() {
        BABYLON.SceneLoader.ImportMeshAsync(
            null,
            'assets/models/buildings/',
            buildingMapping[this._key].asset,
            game.gameScene.scene)
            .then((result) => {
                this._mesh = result.meshes[0];
                this._mesh.checkCollisions = true;
                this._mesh.metadata = {
                    key: this._key,
                    isBuilding: true,
                    buildingId: this._id,
                };

                this.setPosition();
                game.gameScene.shadowGenerator.getShadowMap().renderList.push(this._mesh);
            });
    }

    private setPosition() {
        this._mesh.position = BABYLON.Vector3.Zero();
        this._mesh.position.x = this._position.x - this._positionFixture.x;
        this._mesh.position.y = game.gameScene.terrain.getHeight(this._position.x, this._position.z);
        this._mesh.position.z = this._position.z - this._positionFixture.z;
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
