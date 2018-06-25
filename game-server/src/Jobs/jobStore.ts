import Job from "./Job";

// TODO: implement with redits.
class JobStore {
    private _jobs: Job[] = [];

    private static instance: JobStore;

    public static get Instance()
    {
        return this.instance || (this.instance = new this());
    }

    public addJob(job: Job) {
        this._jobs.push(job);
    }

    public getFreeJobByType(jobType: string) {

    }

    public update() {
        this._jobs.forEach((job: Job, index: number) => {
            if (job.isFinished) {
                console.log('remove', index);
            }
        });
    }
}

export default JobStore.Instance;
