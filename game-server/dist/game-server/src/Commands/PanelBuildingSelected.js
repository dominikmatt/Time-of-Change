"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("./Command"));
/**
 * This command is executed when a player builds a new building.
 */
class BuildBuildingCommand extends Command_1.default {
    getCommand() {
        return 'panel.building.selected';
    }
    execute(req) {
        const buildingId = req.buildingId;
        const building = this.player.getBuildingById(buildingId);
        let panelType = 'default';
        if (null !== building) {
            panelType = building.getType();
        }
    }
}
exports.default = BuildBuildingCommand;
//# sourceMappingURL=PanelBuildingSelected.js.map