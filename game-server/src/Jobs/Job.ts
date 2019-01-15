import {v1 as uuidv1} from "uuid";
import Player from "../Player";

export default class Job {
    protected readonly _id: string = uuidv1();
    protected readonly _type: string;

    /**
     * If this property is true the job will be readded to the list when the working-character is killed.
     */
    protected _reAddOnDestroy: boolean = true;

    private _inProgress: boolean = false;

    private _isFinished: boolean = true;

    protected _currentStep: number = 0;

    protected readonly _player: Player;

    constructor(player: Player) {
        this._player = player;
    }

    public getType(): string {
        return this._type;
    }

    public addToDb(): void {
        throw new Error('Job: Implement addToDb method.');
    }

    public toJSON(): void {
        throw new Error('Job: Implement toJSON method.');
    }

    public update(): void {
        throw new Error('Job: Implement update method.');
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

    get id(): string {
        return this._id;
    }

    get reAddOnDestroy(): boolean {
        return this._reAddOnDestroy;
    }
}
