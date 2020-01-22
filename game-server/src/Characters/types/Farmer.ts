import Character from "../Character";
import CharacterInterface from "../CharacterInterface";

export default class Farmer extends Character implements CharacterInterface {
    public getType(): string {
        return 'farmer';
    }

    public getBuildingType(): string {
        return 'farm';
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
        this._building.nextJob.character = this;
        this._job = this._building.nextJob;
    }
}
