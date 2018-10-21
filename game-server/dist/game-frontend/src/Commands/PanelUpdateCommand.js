"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("./Command"));
;
/**
 * This command is executed when the panel has been updated.
 */
class PanelUpdateCommand extends Command_1.default {
    getCommand() {
        return 'panel.update';
    }
    execute(req) {
        console.log(req);
    }
}
exports.default = PanelUpdateCommand;
//# sourceMappingURL=PanelUpdateCommand.js.map