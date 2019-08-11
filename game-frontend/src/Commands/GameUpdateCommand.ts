import Command from "./Command";
import {RequestInterface} from "./CommandInterface";
import game from "../Game";
import gameStateChangedEvent from "../Events/GameStateChangedEvent";

/**
 * This command is executed when a player builds a new building.
 */
export default class GameUpdateCommand extends Command {
    getCommand() {
        return 'game.update';
    }

    execute(req: RequestInterface) {
        console.log(req)
        if (req.gameState) {
            gameStateChangedEvent.trigger({
                gameState: req.gameState,
                playersCount: req.playersCount,
            });
        }
    }
}
