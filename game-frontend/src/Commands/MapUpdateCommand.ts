import Command from "./Command";
import {RequestInterface} from "./CommandInterface";
import game from "../Game";

/**
 * This command is executed when a player builds a new building.
 */
export default class MapUpdateCommand extends Command {
    getCommand() {
        return 'map.update';
    }

    execute(req: RequestInterface) {
        console.log(req);
        game.gameScene.updateCoordinate(req);
    }
}
