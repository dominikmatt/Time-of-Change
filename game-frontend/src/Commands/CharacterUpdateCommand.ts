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
        if (!aliveCharacters[req._id]) {
            aliveCharacters[req._id] = new Character(req._id, req.position);
        }

        aliveCharacters[req._id].position = req.position;
        aliveCharacters[req._id].walkingPath = req.walkingPath;
        aliveCharacters[req._id].isWalking = req.isWalking;
    }
}
