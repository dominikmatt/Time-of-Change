"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let instance;
class GameScene {
    static getInstance() {
        if (!instance) {
            instance = new GameScene();
        }
        return instance;
    }
}
const gameScene = GameScene.getInstance();
exports.default = gameScene;
//# sourceMappingURL=Scene.js.map