import BuildingFactory from "../Buildings/BuildingFactory";
import Command from "./Command";
import {RequestInterface} from "./CommandInterface";
import Field from "../Field/Field";

/**
 * This command is executed when a player builds a new building.
 */
export default class BuildFieldCommand extends Command {
    getCommand() {
        return 'field.create';
    }

    execute(req: RequestInterface) {
        // TOD: Create Building store.
        this.player.addField(new Field(
            {
                position: {
                    x: parseInt(req.position.x),
                    z: parseInt(req.position.z)
                }
            },
            this.player));
    }
}
