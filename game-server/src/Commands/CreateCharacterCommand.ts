import BuildingFactory from "../Buildings/BuildingFactory";
import Command from "./Command";
import {RequestInterface} from "./CommandInterface";
import CharacterFactory from "../Characters/CharacterFactory";

/**
 * This command is executed when a player builds a new building.
 */
export default class CreateCharacterCommand extends Command {
    getCommand() {
        return 'character.create';
    }

    execute(req: RequestInterface) {
        // TOD: Create Building store.
        console.log(req);
        this.player.addCharacter(CharacterFactory(req.type, req.buildingId, this.player));
    }
}
