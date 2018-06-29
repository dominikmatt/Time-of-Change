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
                console.log(job);
                this._job = new TransportJob(this._player, job.startPosition, job.resourceType, this);
            });
    }
}