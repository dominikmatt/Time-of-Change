import Job from "./Job";
import Player from "../Player";

export default class JobStore {
    private readonly _player: Player;

    constructor(player: Player) {
        this._player = player;
    }

    public addJob(job: Job) {
        if (!job.getType) {
            console.log(job);
        }
        this._player.db.rpush(`jobs:${job.getType()}`, job.toJSON());

        // Remove job from ram.
        job = null;
    }

    public getFreeJobByType(jobType: string) {
        return new Promise((resolve, reject) => {
            this._player.db.lpop(`jobs:${jobType}`)
                .then((data: string) => {
                    resolve(JSON.parse(data));
                })
                .catch((error) => {
                    throw new Error(error);
                });
        });
    }

    public update() {

    }
}
