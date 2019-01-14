"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Storehouse_1 = require("./types/Storehouse");
const Schoolhouse_1 = require("./types/Schoolhouse");
const Woodcutters_1 = require("./types/Woodcutters");
const Bakery_1 = require("./types/Bakery");
const Brewery_1 = require("./types/Brewery");
const Butchers_1 = require("./types/Butchers");
const Farm_1 = require("./types/Farm");
const Inn_1 = require("./types/Inn");
const Mill_1 = require("./types/Mill");
const Mine_1 = require("./types/Mine");
const Quary_1 = require("./types/Quary");
const Sawmill_1 = require("./types/Sawmill");
const Smithy_1 = require("./types/Smithy");
;
const buildingMapping = {
    storehouse: Storehouse_1.default,
    schoolhouse: Schoolhouse_1.default,
    woodcutters: Woodcutters_1.default,
    bakery: Bakery_1.default,
    brewery: Brewery_1.default,
    butchers: Butchers_1.default,
    farm: Farm_1.default,
    inn: Inn_1.default,
    mill: Mill_1.default,
    mine: Mine_1.default,
    quary: Quary_1.default,
    sawmill: Sawmill_1.default,
    smithy: Smithy_1.default,
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
    const building = new buildingMapping[key](player, position, alreadyBuilt);
    building.update();
    return building;
};
//# sourceMappingURL=BuildingFactory.js.map