import Command from "./Command";
import {RequestInterface} from "./CommandInterface";
import Building from "../Buildings/Building";
import panel from "../Panel/panel";
import Character from "../Characters/Character";

/**
 * This command is executed when a player builds a new building.
 */
export default class PanelCharacterSelected extends Command {
    getCommand() {
        return 'panel.character.selected';
    }

    execute(req: RequestInterface) {
        const characterId: string = req.characterId;
        const character: Character|null = this.player.getCharacterById(characterId);

        if (null !== character) {
            this.player.panel.setPanelInfo({
                id: character.id,
                type: `character`,
                data: character,
            });
        } else {
            this.player.panel.setPanelInfo({
                id: null,
                type: 'default',
                data: {},
            });
        }
    }
}
