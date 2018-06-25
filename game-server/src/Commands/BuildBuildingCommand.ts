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
        console.log('create on player: ', this.player.name);
        // TOD: Create Building store.
        this.player.addBuilding(BuildingFactory(req.type, {x: 0, y: 0, z: 0}, this.player, false));
    }
}
