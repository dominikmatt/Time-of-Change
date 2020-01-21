"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Character_1 = require("../Character");
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