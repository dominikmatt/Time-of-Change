import BuildingFactory from "../Buildings/BuildingFactory";
import Command from "./Command";
import {RequestInterface} from "./CommandInterface";

/**
 * This command is executed when a player builds a new building.
 */
export default class BuildBuildingCommand extends Command {
    getCommand() {
        return 'building.create';
    }

    execute(req: RequestInterface) {
        // TOD: Create Building store.
        this.player.addBuilding(BuildingFactory(req.type, {
            x: parseInt(req.position.x),
            z: parseInt(req.position.z)
        }, this.player, false));
    }
}
