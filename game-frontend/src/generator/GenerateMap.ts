import * as BABYLON from 'babylonjs'
import game, {Game} from "../Game";
import connectionService from "../services/connection";

export default class GenerateMap {
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
}
