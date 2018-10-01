import Building from "./Buildings/Building";
import game, {Game} from "./Game";
import connectionService from "./services/connection";
import * as BABYLON from "babylonjs";

export default class Terrain {
    private readonly _game: Game;
    private _mesh: BABYLON.AbstractMesh;
    private _heightData: any;

    constructor() {
        this._game = game;

        BABYLON.SceneLoader.ImportMesh(
            '',
            'maps/flat/',
            'flat.babylon',
            this._game.gameScene.scene,
            (meshes) => {
                this._mesh = meshes[0];
                this._mesh.position.x = 0;
                this._mesh.position.z = 0;
                this._mesh.setPivotMatrix(BABYLON.Matrix.Translation(-8, 0, -8));
                this._mesh.material.wireframe = true;

                this.generateHeightData();

                connectionService.socket.emit('map.data');
            });
    }

    /**
     * Generate the height data of the map.
     * TODO: Move it to a helper class and store it to a json file.
     */
    private generateHeightData() {
        const heightData: any = {};

        const positions = this._mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);

        for (let i = 0; i < positions.length; i += 3) {
            const x = Math.round(positions[i]);
            const y = positions[i+1];
            const z = Math.round(positions[i+2]);

            if (!heightData[x]) {
                heightData[x] = {};
            }

            heightData[x][z] = y;
        }

        this._heightData = heightData;
    }

    /**
     * Returns the height of given coordinate.
     *
     * @return {number}
     */
    public getHeight(x: number, z: number): number {
        return (this ._heightData[x][z] + this._heightData[x+1][z+1] + this._heightData[x][z+1] + this._heightData[x+1][z]) / 4;
    }
}