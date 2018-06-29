import Character from "../Character";
import CharacterInterface from "../CharacterInterface";
import TransportJob from "../../Jobs/types/TransportJob";

export default class Laborer extends Character implements CharacterInterface {
    public getType(): string {
        return 'laborer';
    }

    protected getCharacterData(): object {
        return {};
    }

    protected findJob() {
        this._player.jobStore.getFreeJobByType('laborer')
            .then((jobJSON: string) => {
                const job: any = JSON.parse(jobJSON);

                this._job = new TransportJob(this._player, job.startPosition, job.resourceType, this);
            });
    }
}