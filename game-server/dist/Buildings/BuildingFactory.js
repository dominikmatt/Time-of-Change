"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Storehouse_1 = __importDefault(require("./types/Storehouse"));
const Schoolhouse_1 = __importDefault(require("./types/Schoolhouse"));
const Woodkutters_1 = __importDefault(require("./types/Woodkutters"));
;
const buildingMapping = {
    storehouse: Storehouse_1.default,
    schoolhouse: Schoolhouse_1.default,
    woodkutters: Woodkutters_1.default,
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
    const building = new buildingMapping[key](player, position, true);
    building.update();
    return building;
};
//# sourceMappingURL=BuildingFactory.js.map