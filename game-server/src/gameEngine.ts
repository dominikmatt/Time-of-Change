import GameLoop from "./GameLoop";

class GameEngine {
    private gameLoop: GameLoop;

    private static instance: GameEngine;

    constructor() {
        this.gameLoop = new GameLoop();
    }

    public static get Instance()
    {
        return this.instance || (this.instance = new this());
    }

    startGame() {
        this.gameLoop.startLoop();
    }
}

export default GameEngine.Instance;
