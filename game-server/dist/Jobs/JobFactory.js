"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Storehouse_1 = __importDefault(require("./types/Storehouse"));
const Schoolhouse_1 = __importDefault(require("./types/Schoolhouse"));
;
const buildingMapping = {
    storehouse: Storehouse_1.default,
    schoolhouse: Schoolhouse_1.default
};
/**
 * Create a new building with given data.
 *
 * @param {string} key
 * @param {PositionComponent} position
 * @param player
 * @param alreadyBuilt
 */
exports.default = (key, position, player, alreadyBuilt = false) => {
    const building = new buildingMapping[key](position, alreadyBuilt);
    building.player = player;
    building.update();
    return building;
};
//# sourceMappingURL=JobFactory.js.map