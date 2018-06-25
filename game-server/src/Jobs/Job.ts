export default class Job {
    protected readonly _type: string;

    private _inProgress: boolean = false;

    private _isFinished: boolean = true;

    public getType(): string {
        return this._type;
    }

    public startJob() {
        this._inProgress = true;
    }

    get inProgress(): boolean {
        return this._inProgress;
    }

    get isFinished(): boolean {
        return this._isFinished;
    }
}
