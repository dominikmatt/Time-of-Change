"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingFactory_1 = __importDefault(require("../Buildings/BuildingFactory"));
const Command_1 = __importDefault(require("./Command"));
/**
 * This command is executed when a player builds a new building.
 */
class BuildBuildingCommand extends Command_1.default {
    getCommand() {
        return 'building.create';
    }
    execute(req) {
        // TOD: Create Building store.
        this.player.addBuilding(BuildingFactory_1.default(req.type, {
            x: parseInt(req.position.x),
            z: parseInt(req.position.z)
        }, this.player, false));
    }
}
exports.default = BuildBuildingCommand;
//# sourceMappingURL=GetMapInfoCommand.js.map