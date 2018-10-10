"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Building_1 = require("../Buildings/Building");
const Schoolhouse_1 = require("../../../game-server/src/Buildings/types/Schoolhouse");
const Storehouse_1 = require("../../../game-server/src/Buildings/types/Storehouse");
;
;
const builtBuildings = {};
const buildingMapping = {
    storehouse: Storehouse_1.default,
    schoolhouse: Schoolhouse_1.default
};
/**
 * This command is executed when a player builds a new building.
 */
class BuildingUpdateCommand extends Command_1.default {
    getCommand() {
        return 'building.update';
    }
    execute(req) {
        if (!builtBuildings[req._id]) {
            builtBuildings[req._id] = new Building_1.default(req.position);
        }
        builtBuildings[req._id].setHealt(req.currentHealth, req.maxHealth);
    }
}
exports.default = BuildingUpdateCommand;
//# sourceMappingURL=BuildingUpdateCommand.js.map