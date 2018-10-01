import Character from "../Character";
import CharacterInterface from "../CharacterInterface";
import TransportJob from "../../Jobs/types/TransportJob";
import Storehouse from "../../Buildings/types/Storehouse";
import Building from "../../Buildings/Building";

export default class Hero extends Character implements CharacterInterface {
    public getType(): string {
        return 'hero';
    }

    protected getCharacterData(): object {
        return {
        };
    }

    protected findJob() {
        // A hreo does not work.
        return;
    }
}