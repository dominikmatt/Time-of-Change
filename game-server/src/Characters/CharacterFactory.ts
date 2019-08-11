import {PositionComponent, PositionInterface} from "../Components/PositionComponent";
import Player from "../Player";
import Serf from "./types/Serf";
import Laborer from "./types/Laborer";
import Character from "./Character";
import Hero from "./types/Hero";
import Woodkutter from "./types/Woodkutter";
import Carpenter from "./types/Carpenter";
import Stonemason from "./types/Stonemason";
import Farmer from "./types/Farmer";

interface CharacterMapping {
    [key:string]: any;
};

const characterMapping: CharacterMapping = {
    serf: Serf,
    laborer: Laborer,
    hero: Hero,
    woodkutter: Woodkutter,
    carpenter: Carpenter,
    stonemason: Stonemason,
    farmer: Farmer,
};

/**
 * Create a new character with given data.
 */
export default (key: string, buildingId: string, player: Player): Character => {
    const character: Character = new characterMapping[key](player, buildingId);

    character.update();

    return character;
}
