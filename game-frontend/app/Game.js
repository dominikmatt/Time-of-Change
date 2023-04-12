"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const GameScene_1 = require("./GameScene");
let instance = null;
class Game {
    static getInstance() {
        if (null === instance) {
            instance = new Game();
        }
        return instance;
    }
    initialize() {
        this._gameScene = new GameScene_1.default();
        this._gameScene.createScene();
    }
    get gameScene() {
        return this._gameScene;
    }
}
exports.Game = Game;
const game = Game.getInstance();
exports.default = game;
//# sourceMappingURL=Game.js.map