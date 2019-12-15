"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("./Command"));
/**
 * This command is executed when a player builds a new building.
 */
class PanelFieldSelected extends Command_1.default {
    getCommand() {
        return 'panel.field.selected';
    }
    execute(req) {
        const position = req.position;
        const field = this.player.getFieldByPosition(position);
        if (null !== field) {
            this.player.panel.setPanelInfo({
                id: field.id,
                type: `field`,
                data: field,
            });
        }
        else {
            this.player.panel.setPanelInfo({
                id: null,
                type: 'default',
                data: {},
            });
        }
    }
}
exports.default = PanelFieldSelected;
//# sourceMappingURL=PanelFieldSelected.js.map