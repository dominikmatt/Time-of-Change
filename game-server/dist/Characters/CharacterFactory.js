"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Serf_1 = __importDefault(require("./types/Serf"));
const Laborer_1 = __importDefault(require("./types/Laborer"));
const Hero_1 = __importDefault(require("./types/Hero"));
const Woodkutter_1 = __importDefault(require("./types/Woodkutter"));
const Carpenter_1 = __importDefault(require("./types/Carpenter"));
const Stonemason_1 = __importDefault(require("./types/Stonemason"));
;
const characterMapping = {
    serf: Serf_1.default,
    laborer: Laborer_1.default,
    hero: Hero_1.default,
    woodkutter: Woodkutter_1.default,
    carpenter: Carpenter_1.default,
    stonemason: Stonemason_1.default,
};
/**
 * Create a new character with given data.
 */
exports.default = (key, buildingId, player) => {
    const character = new characterMapping[key](player, buildingId);
    character.update();
    return character;
};
//# sourceMappingURL=CharacterFactory.js.map