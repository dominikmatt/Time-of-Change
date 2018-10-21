"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const panel_1 = require("../ui/panel/panel");
;
/**
 * This command is executed when the panel has been updated.
 */
class PanelUpdateCommand extends Command_1.default {
    getCommand() {
        return 'panel.update';
    }
    execute(req) {
        panel_1.default.setContent(req.content);
    }
}
exports.default = PanelUpdateCommand;
//# sourceMappingURL=PanelUpdateCommand.js.map