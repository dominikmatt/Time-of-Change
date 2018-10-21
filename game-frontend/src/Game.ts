import GameScene from "./GameScene";
let instance: Game = null;

export class Game {
    private _gameScene: GameScene;

    public static getInstance(): Game {
        if (null === instance) {
            instance = new Game();
        }

        return instance;
    }

    initialize() {
        this._gameScene = new GameScene();

        this._gameScene.createScene();
    }

    get gameScene(): GameScene {
        return this._gameScene;
    }
}

const game: Game = Game.getInstance();

export default game;
