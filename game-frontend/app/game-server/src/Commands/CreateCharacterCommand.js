"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
/**
 * This command is executed when a player builds a new building.
 */
class CreateCharacterCommand extends Command_1.default {
    getCommand() {
        return 'character.create';
    }
    execute(req) {
        const schoolhouse = this.player.getBuildingById(req.buildingId);
        if (null === schoolhouse) {
            return;
        }
        schoolhouse.addToQueue(req.type);
    }
}
exports.default = CreateCharacterCommand;
//# sourceMappingURL=CreateCharacterCommand.js.map