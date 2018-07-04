export default class Terrain {
    private readonly _game: any;
    constructor(game: any) {
        this._game = game;

            BABYLON.SceneLoader.ImportMesh("spaceship", "maps/slishou/", "slishou.babylon", this._game.scene,
                function (newMeshes, particleSystems) {
                    console.log(particleSystems);
            });
    }
}
