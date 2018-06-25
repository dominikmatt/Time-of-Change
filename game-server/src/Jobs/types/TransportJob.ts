import Job from "../Job";
import JobInterface from "../JobInterface";

export default class TransportJob extends Job implements JobInterface {
    protected readonly _type: string = 'transport';
    private readonly _resourceType: string = '';

    constructor(resourceType: string) {
        super();

        this._resourceType = resourceType;
    }
}
