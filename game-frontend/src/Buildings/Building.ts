import {Game} from "../Game";
import PositionInterface from "../interfaces/PositionInterface";

export default class Building {
    private readonly _game: Game;
    private readonly _position: PositionInterface;
    protected _mesh: BABYLON.AbstractMesh;
    protected readonly _positionFixture: PositionInterface = {
        x: 1,
        y: 0,
        z: -1
    };

    constructor(game: Game, position: PositionInterface) {
        this._game = game;
        this._position = position;

        this.load();
    }

    private load() {
        BABYLON.SceneLoader.ImportMeshAsync(
            null,
            'assets/buildings/',
            'storehouse.babylon',
            this._game.scene)
            .then((result) => {
                this._mesh = result.meshes[0];
                this.setPosition();
            });
    }

    private setPosition() {
        this._mesh.position = BABYLON.Vector3.Zero();
        this._mesh.position.x = this._position.x + this._positionFixture.x;
        this._mesh.position.z = -(this._position.z) + this._positionFixture.z;
    }
}