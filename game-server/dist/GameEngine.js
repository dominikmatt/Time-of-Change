"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameLoop_1 = __importDefault(require("./GameLoop"));
class GameEngine {
    constructor() {
        this.gameLoop = new GameLoop_1.default();
    }
    static get Instance() {
        return this.instance || (this.instance = new this());
    }
    startGame() {
        this.gameLoop.startLoop();
    }
}
exports.default = GameEngine.Instance;
//# sourceMappingURL=GameEngine.js.map