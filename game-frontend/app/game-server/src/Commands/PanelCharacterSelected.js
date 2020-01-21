"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("./Command");
/**
 * This command is executed when a player builds a new building.
 */
class PanelCharacterSelected extends Command_1.default {
    getCommand() {
        return 'panel.character.selected';
    }
    execute(req) {
        const characterId = req.characterId;
        const character = this.player.getCharacterById(characterId);
        if (null !== character) {
            this.player.panel.setPanelInfo({
                id: character.id,
                type: `character`,
                data: character,
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
exports.default = PanelCharacterSelected;
//# sourceMappingURL=PanelCharacterSelected.js.map