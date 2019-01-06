import {default as game} from "../Game";
import PositionInterface from "../interfaces/PositionInterface";
import assetsManager from "../AssetsManager";

export default class Character {
    private _position: PositionInterface;
    protected _mesh: BABYLON.AbstractMesh;
    protected _id: string;

    constructor(id: string, position: PositionInterface) {
        this._position = position;
        this._id = id;

        this.load();
    }

    set position(position: PositionInterface) {
        this._position = position;

        this.setPosition();
    }

    /**
     * Load character and place it to the scene.
     */
    private load() {
        this._mesh = assetsManager.getCharacterMeshByName('character', this._id);
        this._mesh.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
        this.setPosition();

        game.gameScene.shadowGenerator.getShadowMap().renderList.push(this._mesh);

        // Show meshes.
        this._mesh.isVisible = true;
    }

    private setPosition() {
        if (!this._mesh) {
            return;
        }

        this._mesh.position = BABYLON.Vector3.Zero();
        this._mesh.position.x = this._position.x;
        this._mesh.position.y = game.gameScene.terrain.getHeight(this._position.x, this._position.z, true);
        this._mesh.position.z = this._position.z;
    }

    public setHealt(currentHealth: number, maxHealth: number) {
        if (!this._mesh) {
            return;
        }

        if (maxHealth === 0 ) {
            maxHealth = 1;
        }

        this._mesh.position.y = currentHealth/maxHealth - 1;
    }
}
