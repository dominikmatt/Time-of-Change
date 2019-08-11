"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const GameStateChangedEvent_1 = require("../Events/GameStateChangedEvent");
/**
 * This command is executed when a player builds a new building.
 */
class GameUpdateCommand extends Command_1.default {
    getCommand() {
        return 'game.update';
    }
    execute(req) {
        if (req.gameState) {
            GameStateChangedEvent_1.default.trigger({
                gameState: req.gameState,
                playersCount: req.playersCount,
            });
        }
    }
}
exports.default = GameUpdateCommand;
//# sourceMappingURL=GameUpdateCommand.js.map