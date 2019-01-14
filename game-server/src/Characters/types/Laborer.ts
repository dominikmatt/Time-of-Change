import Character from "../Character";
import CharacterInterface from "../CharacterInterface";
import BuildJob from "../../Jobs/types/BuildJob";
import Building from "../../Buildings/Building";

export default class Laborer extends Character implements CharacterInterface {
    public getType(): string {
        return 'laborer';
    }

    protected getCharacterData(): object {
        return {};
    }

    protected findJob() {
        this._player.jobStore.getFreeJobByType('build')
            .then((job: any) => {
                // No Storehouse found with resource append job to job-list.
                if (null === job) {
                    return;
                }

                const targetBuilding: Building = this._player.buildingManager.findBuildingById(job.targetBuilding);


                this._job = new BuildJob(this._player, targetBuilding, this);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}