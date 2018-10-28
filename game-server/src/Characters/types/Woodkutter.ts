import Character from "../Character";
import CharacterInterface from "../CharacterInterface";
import TransportJob from "../../Jobs/types/TransportJob";
import Storehouse from "../../Buildings/types/Storehouse";
import Building from "../../Buildings/Building";

export default class Woodkutter extends Character implements CharacterInterface {
    public getType(): string {
        return 'woodkutter';
    }

    public getBuildingType(): string {
        return 'woodkutters';
    }

    public getNeedBuilding(): boolean {
        return true;
    }

    protected getCharacterData(): object {
        return {};
    }

    protected findBuilding() {

    }

    protected findJob() {
        if (null === this._building.nextJob) {
            return;
        }

        this._walkTarget = this._building.doorPosition;
        this._job = this._building.nextJob;
    }
}