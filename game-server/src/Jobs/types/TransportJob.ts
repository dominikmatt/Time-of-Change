import Job from "../Job";
import JobInterface from "../JobInterface";
import Player from "../../Player";

export default class TransportJob extends Job implements JobInterface {
    protected readonly _type: string = 'transport';
    private readonly _resourceType: string = '';

    constructor(player: Player, resourceType: string) {
        super(player);

        this._resourceType = resourceType;
    }

    public addToDb(): void {
        this._player.db.hset(`job:${this._id}`, 'resourceType', this._resourceType);
    }
}
