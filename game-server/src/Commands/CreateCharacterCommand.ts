import Command from "./Command";
import {RequestInterface} from "./CommandInterface";
import Building from "../Buildings/Building";
import Schoolhouse from "../Buildings/types/Schoolhouse";

/**
 * This command is executed when a player builds a new building.
 */
export default class CreateCharacterCommand extends Command {
    getCommand() {
        return 'character.create';
    }

    execute(req: RequestInterface) {
        const schoolhouse: Building = this.player.getBuildingById(req.buildingId);

        if (null === schoolhouse) {
            return;
        }

        (<Schoolhouse>schoolhouse).addToQueue(req.type);
    }
}
