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
        if (false === req.isAlive) {
            if (aliveCharacters[req._id]) {
                aliveCharacters[req._id].kill();
                delete aliveCharacters[req._id];
            }
            return;
        }
        if (!aliveCharacters[req._id]) {
            aliveCharacters[req._id] = new Character_1.default(req._id, req.position);
        }
        if (req.walkingPath && 1 < req.walkingPath.length) {
            aliveCharacters[req._id].nextPosition = new BABYLON.Vector3(req.walkingPath[1].x + 0.5, 0, req.walkingPath[1].z + 0.5);
        }
        aliveCharacters[req._id].position = req.position;
        aliveCharacters[req._id].walkingPath = req.walkingPath;
        aliveCharacters[req._id].isWalking = req.isWalking;
    }
}
exports.default = CharacterUpdateCommand;
//# sourceMappingURL=CharacterUpdateCommand.js.map