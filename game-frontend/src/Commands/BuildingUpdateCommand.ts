import Command from "./Command";
import {RequestInterface} from "./CommandInterface";
import Storehouse from "./../Buildings/types/Storehouse";
import Schoolhouse from "./../Buildings/types/Schoolhouse";

interface builtBuildingInterface {
    [key:string]: any;
    _id?: string;
};

interface BuildingMapping {
    [key:string]: any;
};

const builtBuildings: builtBuildingInterface = {};
const buildingMapping: BuildingMapping = {
    storehouse: Storehouse,
    schoolhouse: Schoolhouse
};

/**
 * This command is executed when a player builds a new building.
 */
export default class BuildingUpdateCommand extends Command {
    getCommand() {
        return 'building.update';
    }

    execute(req: RequestInterface) {
        if (!builtBuildings[req._id]) {
            builtBuildings[req._id] = new buildingMapping[req.type](req.position);
        }

        builtBuildings[req._id].setHealt(req.currentHealth, req.maxHealth);
    }
}
