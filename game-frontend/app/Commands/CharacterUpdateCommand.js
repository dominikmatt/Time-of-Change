"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
const Character_1 = require("../Character/Character");
;
const aliveCharacters = {};
/**
 * This command is executed when a character has changed his position or have died.
 */
class CharacterUpdateCommand extends Command_1.default {
    getCommand() {
        return 'character.update';
    }
    execute(req) {
        if (!aliveCharacters[req._id]) {
            aliveCharacters[req._id] = new Character_1.default(req.position);
        }
        aliveCharacters[req._id].position = req.position;
    }
}
exports.default = CharacterUpdateCommand;
//# sourceMappingURL=CharacterUpdateCommand.js.map