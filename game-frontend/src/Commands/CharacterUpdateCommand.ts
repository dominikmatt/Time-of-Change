import Command from "./Command";
import {RequestInterface} from "./CommandInterface";
import Character from "../Character/Character";

interface aliveCharactersInterface {
    [key:string]: any;
    _id?: string;
};

const aliveCharacters: aliveCharactersInterface = {};

/**
 * This command is executed when a character has changed his position or have died.
 */
export default class CharacterUpdateCommand extends Command {
    getCommand() {
        return 'character.update';
    }

    execute(req: RequestInterface) {
        if (false === req.isAlive) {
            if (aliveCharacters[req._id]) {
                aliveCharacters[req._id].kill();
                delete aliveCharacters[req._id];
            }

            return;
        }

        if (!aliveCharacters[req._id]) {
            aliveCharacters[req._id] = new Character(req._id, req.position);
        }

        if (req.walkingPath && 1 < req.walkingPath.length) {
            aliveCharacters[req._id].nextPosition = new BABYLON.Vector3(req.walkingPath[1].x + 0.5, 0, req.walkingPath[1].z + 0.5);
        }

        aliveCharacters[req._id].position = req.position;
        aliveCharacters[req._id].walkingPath = req.walkingPath;
        aliveCharacters[req._id].isWalking = req.isWalking;
    }
}
