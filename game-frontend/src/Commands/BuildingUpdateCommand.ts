import Command from "./Command";
import {RequestInterface} from "./CommandInterface";
import buildingMapping from "../Buildings/buildingMapping";

interface builtBuildingInterface {
    [key:string]: any;
    _id?: string;
};

export const builtBuildings: builtBuildingInterface = {};

/**
 * This command is executed when a player builds a new building.
 */
export default class BuildingUpdateCommand extends Command {
    getCommand() {
        return 'building.update';
    }

    execute(req: RequestInterface) {
        console.log(req.type)
        if (!builtBuildings[req._id]) {
            builtBuildings[req._id] = new buildingMapping[req.type](req.position, req._id, req.playerId);
        }

        builtBuildings[req._id].setHealt(req.currentHealth, req.maxHealth);
    }
}
