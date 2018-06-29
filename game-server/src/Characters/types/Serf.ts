import Character from "../Character";
import CharacterInterface from "../CharacterInterface";
import TransportJob from "../../Jobs/types/TransportJob";

export default class Serf extends Character implements CharacterInterface {
    public getType(): string {
        return 'serf';
    }

    protected getCharacterData(): object {
        return {};
    }

    protected findJob() {
        this._player.jobStore.getFreeJobByType('transport')
            .then((job: any) => {
                const building = this._player.buildingManager.findStorehouseWithResource(job.resourceType);
                let startPosition = job.startPosition;

                if (building) {
                    startPosition = building.doorPosition;
                }

                this._job = new TransportJob(this._player, startPosition, job.resourceType, this);
                this._walkTarget = startPosition;

                // No Storehouse found with resource append job to job-list.
                if (!building) {
                    this._player.jobStore.addJob(this._job);
                    this._job = null;
                    this._walkTarget = [];
                }
            });
    }
}