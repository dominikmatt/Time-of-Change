import Character from "../Character";
import CharacterInterface from "../CharacterInterface";

export default class Miller extends Character implements CharacterInterface {
    public getType(): string {
        return 'miller';
    }

    public getBuildingType(): string {
        return 'mill';
    }

    public getNeedBuilding(): boolean {
        return true;
    }

    protected getCharacterData(): object {
        return {};
    }

    protected findJob() {
        if (null === this._building.nextJob) {
            return;
        }

        this._walkTarget = this._building.doorPosition;
        this._job = this._building.nextJob;
    }
}