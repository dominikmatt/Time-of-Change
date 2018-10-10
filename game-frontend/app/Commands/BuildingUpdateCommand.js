"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Storehouse_1 = require("./../Buildings/types/Storehouse");
const Schoolhouse_1 = require("./../Buildings/types/Schoolhouse");
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
            builtBuildings[req._id] = new buildingMapping[req.type](req.position);
        }
        builtBuildings[req._id].setHealt(req.currentHealth, req.maxHealth);
    }
}
exports.default = BuildingUpdateCommand;
//# sourceMappingURL=BuildingUpdateCommand.js.map