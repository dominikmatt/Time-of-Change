import Job from "./Job";
import Player from "../Player";
import {PositionInterface} from "../Components/PositionComponent";
import {getDistanceFromPoints} from "../utils/coordinates";

export default class JobStore {
    private readonly _player: Player;

    constructor(player: Player) {
        this._player = player;
    }

    public addJob(job: Job) {
        this._player.db.rpush(`jobs:${job.getType()}`, job.toJSON());

        // Remove job from ram.
        job = null;
    }

    /**
     * TODO: Remove given job from store.
     *
     * @param jobType
     * @param position
     */
    public getNearestFreeJobByType(jobType: string, position: PositionInterface) {
        console.log(position);
        return new Promise((resolve, reject) => {
            let nearestDistance: number = 0;
            let nearestJob: object = null;

            this._player.db.lrange(`jobs:${jobType}`, 0, 10)
                .then((data: string[]) => {
                    data.forEach((jobJSON: string) => {
                        const job = JSON.parse(jobJSON);

                        if (!job.startPosition) {
                            return true;
                        }

                        const distance: number = getDistanceFromPoints(job.startPosition, position);

                        if (null === nearestJob || nearestDistance > distance) {
                            nearestDistance = job.startPosition;
                            nearestJob = job;
                        }
                    });


                    console.log(nearestJob);
                    resolve(nearestJob);
                })
                .catch((error) => {
                    throw new Error(error);
                });
        });
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
