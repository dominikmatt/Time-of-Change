import Job from "./Job";
import Player from "../Player";

export default class JobStore {
    private readonly _player: Player;

    constructor(player: Player) {
        this._player = player;
    }

    public addJob(job: Job) {
        this._player.db.sadd(`jobs:${job.getType()}`, job.id);
        this._player.db.hset(`job:${job.id}`, '_id', job.id);
        this._player.db.hset(`job:${job.id}`, 'type', job.getType());
        this._player.db.hset(`job:${job.id}`, 'player', this._player.token);

        job.addToDb();

        // Remove job from ram.
        job = null;
    }

    public getFreeJobByType(jobType: string) {
        return new Promise((resolve, reject) => {
        this._player.db.spop(`jobs:${jobType}`)
            .then((id: string) => {
                const key: string = `job:${id}`;

                this._player.db.hgetall(key)
                    .then((data) => {
                        resolve(data);
                    });

                this._player.db.del(key);
            })
            .catch((error) => {
                throw new Error(error);
            });
        });
    }

    public update() {

    }
}
