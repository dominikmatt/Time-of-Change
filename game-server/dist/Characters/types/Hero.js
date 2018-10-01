"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Character_1 = __importDefault(require("../Character"));
class Hero extends Character_1.default {
    getType() {
        return 'hero';
    }
    getCharacterData() {
        return {};
    }
    findJob() {
        // A hreo does not work.
        return;
    }
}
exports.default = Hero;
//# sourceMappingURL=Hero.js.map