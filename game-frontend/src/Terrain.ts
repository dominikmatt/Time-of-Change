import Building from "./Buildings/Building";

export default class Terrain {
    private readonly _game: any;

    constructor(game: any) {
        this._game = game;

        BABYLON.SceneLoader.ImportMesh(
            '',
            'maps/flat/',
            'flat.babylon',
            this._game.scene,
            (meshes, x, materials) => {
                console.log(meshes);
                meshes.forEach((mesh) => {
                    mesh.position.x = mesh.scaling.x;
                    mesh.position.z = -(mesh.scaling.z);
                    mesh.rotation.y = Math.PI/2;

                    mesh.material.wireframe = false;
                });
            });

        const building = new Building(this._game, {
            x: 5,
            y: 0,
            z: 5,
        });

        const building1 = new Building(this._game, {
            x: 9,
            y: 0,
            z: 9,
        });
    }
}
