import {default as game, Game} from "../Game";
import PositionInterface from "../interfaces/PositionInterface";

export default class Character {
    private readonly _game: Game;
    private _position: PositionInterface;
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

    set position(position: PositionInterface) {
        this._position = position;

        this.setPosition();
    }

    private load() {
        BABYLON.SceneLoader.ImportMeshAsync(
            null,
            'assets/characters/',
            'Ballbot.babylon',
            game.gameScene.scene)
            .then((result) => {
                this._mesh = result.meshes[0];
                this._mesh.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
                this.setPosition();
            });
    }

    private setPosition() {
        if (!this._mesh) {
            return;
        }

        this._mesh.position = BABYLON.Vector3.Zero();
        this._mesh.position.x = this._position.x;
        this._mesh.position.y = game.gameScene.terrain.getHeight(this._position.x, this._position.z) + 0.5;
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
