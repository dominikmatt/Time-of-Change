"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.builtBuildings = void 0;
const Command_1 = require("./Command");
const buildingMapping_1 = require("../Buildings/buildingMapping");
;
exports.builtBuildings = {};
/**
 * This command is executed when a player builds a new building.
 */
class BuildingUpdateCommand extends Command_1.default {
    getCommand() {
        return 'building.update';
    }
    execute(req) {
        if (!exports.builtBuildings[req._id]) {
            exports.builtBuildings[req._id] = new buildingMapping_1.default[req.type](req.position, req._id, req.playerId);
        }
        exports.builtBuildings[req._id].setHealt(req.currentHealth, req.maxHealth);
    }
}
exports.default = BuildingUpdateCommand;
//# sourceMappingURL=BuildingUpdateCommand.js.map