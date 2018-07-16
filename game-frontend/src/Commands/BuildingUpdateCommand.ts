import Command from "./Command";
import {RequestInterface} from "./CommandInterface";
import Building from "../Buildings/Building";

interface builtBuildingInterface {
    [key:string]: any;
    _id?: string;
};

const builtBuildings: builtBuildingInterface = {};

/**
 * This command is executed when a player builds a new building.
 */
export default class BuildingUpdateCommand extends Command {
    getCommand() {
        return 'building.update';
    }

    execute(req: RequestInterface) {
        if (!builtBuildings[req._id]) {
            builtBuildings[req._id] = new Building(req.position);
        }

        builtBuildings[req._id].setHealt(req.currentHealth, req.maxHealth);
    }
}
