import {PositionComponent, PositionInterface} from "../Components/PositionComponent";
import Player from "../Player";
import Serf from "./types/Serf";
import Laborer from "./types/Laborer";
import Character from "./Character";

interface CharacterMapping {
    [key:string]: any;
};

const characterMapping: CharacterMapping = {
    serf: Serf,
    laborer: Laborer
};

/**
 * Create a new character with given data.
 */
export default (key: string, player: Player): Character => {
    const character: Character = new characterMapping[key](player);

    character.update();

    return character;
}