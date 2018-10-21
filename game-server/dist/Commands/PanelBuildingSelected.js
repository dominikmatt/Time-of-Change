"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("./Command"));
const panel_1 = __importDefault(require("../Panel/panel"));
/**
 * This command is executed when a player builds a new building.
 */
class PanelBuildingSelected extends Command_1.default {
    getCommand() {
        return 'panel.building.selected';
    }
    execute(req) {
        const buildingId = req.buildingId;
        const building = this.player.getBuildingById(buildingId);
        if (null !== building) {
            panel_1.default.setPanelInfo({
                id: building.id,
                type: `building-${building.getType()}`,
                data: building,
            });
        }
        else {
            panel_1.default.setPanelInfo({
                id: null,
                type: 'default',
                data: {},
            });
        }
    }
}
exports.default = PanelBuildingSelected;
//# sourceMappingURL=PanelBuildingSelected.js.map