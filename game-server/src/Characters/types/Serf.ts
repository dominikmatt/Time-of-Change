import Character from "../Character";
import CharacterInterface from "../CharacterInterface";
import TransportJob from "../../Jobs/types/TransportJob";
import Storehouse from "../../Buildings/types/Storehouse";
import Building from "../../Buildings/Building";
import TransportToStorehouseJob from "../../Jobs/types/TransportToStorehouseJob";

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
                // No Storehouse found with resource append job to job-list.
                if (null === job) {
                    return;
                }

                if (true === job.toStore) {
                    this._job = new TransportToStorehouseJob(
                        this._player,
                        job.resourceType,
                        this._player.getBuildingById(job.building),
                        this
                    );

                    this._walkTarget = job.startPosition;

                    return;
                }

                const building: Storehouse = this._player.buildingManager.findStorehouseWithResource(job.resourceType);
                const targetBuilding: Building = this._player.buildingManager.findBuildingById(job.targetBuilding);
                let startPosition = job.startPosition;

                this._job = new TransportJob(
                    this._player,
                    building.doorPosition,
                    job.resourceType,
                    targetBuilding,
                    this,
                    building
                );

                this._walkTarget = startPosition;

                // No Storehouse found with resource append job to job-list.
                if (!building) {
                    this._player.jobStore.addJob(this._job);
                    this._job = null;
                    this._walkTarget = null;
                }
            });
    }
}