"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gameEngine_1 = __importDefault(require("./gameEngine"));
require("./WsConnection");
require("./Map/Map");
console.log('v0.1.3');
gameEngine_1.default.startGame();
//# sourceMappingURL=index.js.map