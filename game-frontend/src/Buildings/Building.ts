import {default as game} from "../Game";
import PositionInterface from "../interfaces/PositionInterface";

export default class Building {
    private readonly _position: PositionInterface;
    protected _mesh: BABYLON.AbstractMesh;
    protected readonly _positionFixture: PositionInterface = {
        x: 1,
        y: 0,
        z: -1
    };

    constructor(position: PositionInterface) {
        this._position = position;

        this.load();
    }

    private load() {
        BABYLON.SceneLoader.ImportMeshAsync(
            null,
            'assets/models/buildings/',
            'schoolhouse.babylon',
            game.gameScene.scene)
            .then((result) => {
                this._mesh = result.meshes[0];

                this.setPosition();
            });
    }

    private setPosition() {
        console.log(game.gameScene.terrain.getHeight(this._position.x, this._position.z));
        this._mesh.position = BABYLON.Vector3.Zero();
        this._mesh.position.x = this._position.x;
        this._mesh.position.y = game.gameScene.terrain.getHeight(this._position.x, this._position.z);
        this._mesh.position.z = this._position.z;
    }

    public setHealt(currentHealth: number, maxHealth: number) {
        if (!this._mesh) {
            return;
        }

        if (maxHealth === 0) {
            maxHealth = 1;
        }

        this._mesh.position.y = game.gameScene.terrain.getHeight(this._position.x, this._position.z) + (currentHealth / maxHealth - 1);
    }
}
