"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("./Command"));
const CharacterFactory_1 = __importDefault(require("../Characters/CharacterFactory"));
/**
 * This command is executed when a player builds a new building.
 */
class CreateCharacterCommand extends Command_1.default {
    getCommand() {
        return 'character.create';
    }
    execute(req) {
        // TOD: Create Building store.
        this.player.addCharacter(CharacterFactory_1.default(req.type, this.player));
    }
}
exports.default = CreateCharacterCommand;
//# sourceMappingURL=CreateCharacterCommand.js.map