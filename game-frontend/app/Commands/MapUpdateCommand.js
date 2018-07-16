"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Game_1 = require("../Game");
/**
 * This command is executed when a player builds a new building.
 */
class MapUpdateCommand extends Command_1.default {
    getCommand() {
        return 'map.update';
    }
    execute(req) {
        // TOD: Create Building store.
        Game_1.default.gameScene.updateCoordinate(req);
    }
}
exports.default = MapUpdateCommand;
//# sourceMappingURL=MapUpdateCommand.js.map