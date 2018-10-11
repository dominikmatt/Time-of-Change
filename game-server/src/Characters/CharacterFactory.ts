import {PositionComponent, PositionInterface} from "../Components/PositionComponent";
import Player from "../Player";
import Serf from "./types/Serf";
import Laborer from "./types/Laborer";
import Character from "./Character";
import Hero from "./types/Hero";

interface CharacterMapping {
    [key:string]: any;
};

const characterMapping: CharacterMapping = {
    serf: Serf,
    laborer: Laborer,
    hero: Hero,
};

/**
 * Create a new character with given data.
 */
export default (key: string, player: Player): Character => {
    console.log(key);
    const character: Character = new characterMapping[key](player);

    character.update();

    return character;
}
