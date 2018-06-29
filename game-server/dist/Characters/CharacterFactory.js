"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Serf_1 = __importDefault(require("./types/Serf"));
const Laborer_1 = __importDefault(require("./types/Laborer"));
;
const characterMapping = {
    serf: Serf_1.default,
    laborer: Laborer_1.default
};
/**
 * Create a new character with given data.
 */
exports.default = (key, player) => {
    const character = new characterMapping[key](player);
    character.update();
    return character;
};
//# sourceMappingURL=CharacterFactory.js.map