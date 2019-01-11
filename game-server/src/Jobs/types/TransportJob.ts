import Job from "../Job";
import JobInterface from "../JobInterface";
import Player from "../../Player";
import {PositionInterface} from "../../Components/PositionComponent";
import Character from "../../Characters/Character";
import Map from "../../Map/Map";
import Storehouse from "../../Buildings/types/Storehouse";
import Building from "../../Buildings/Building";

export default class TransportJob extends Job implements JobInterface {
    protected readonly _type: string = 'transport';
    private readonly _resourceType: string = '';
    private readonly _startPosition: PositionInterface;
    private readonly _targetBuilding: Building;
    private readonly _character?: Character = null;
    private _isCharacterWalking: boolean = false;
    private _isCharacterAtStart: boolean = false;
    private _storehouse: Storehouse;

    constructor(
        player: Player,
        startPosition: PositionInterface,
        resourceType: string,
        targetBuilding?: Building,
        character?: Character,
        storehouse?: Storehouse
    ) {
        super(player);

        this._resourceType = resourceType;
        this._startPosition = startPosition;
        this._targetBuilding = targetBuilding;
        this._character = character;
        this._storehouse = storehouse;
    }

    public toJSON(): string {
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
            resourceType: this._resourceType,
            startPosition: this._startPosition,
            targetBuilding: this._targetBuilding.id
        });
    }

    public update(): void {
        switch (this._currentStep) {
            case 0:
                if (!this._isCharacterWalking && !this._isCharacterAtStart) {
                    const path = Map.findRunnablePath(this._character.position.position, this._startPosition);

                    this._character.walkByPath(path);
                    this._isCharacterWalking = true;

                    this._currentStep++;
                }
                break;
            case 1:
                if (this._character.position.x === this._startPosition.x &&
                    this._character.position.z === this._startPosition.z
                ) {
                    const storeHasResource = this._storehouse.takeOutResource(this._resourceType);
                    this._isCharacterAtStart = true;
                    this._isCharacterWalking = false;

                    console.log(storeHasResource);
                    // No resource found on Storehouse.
                    if (!storeHasResource) {
                            this._player.jobStore.addJob(this);
                            this._character.job = null;

                            return;
                    }

                    this._currentStep++;
                }
                break;
            case 2:
                const path = Map.findRunnablePath(this._character.position.position, this._targetBuilding.doorPosition);
                this._character.walkByPath(path);
                this._isCharacterWalking = true;

                this._currentStep++;
                break;
            case 3:
                if (this._character.position.x === this._targetBuilding.doorPosition.x &&
                    this._character.position.z === this._targetBuilding.doorPosition.z
                ) {
                    if (true === this._targetBuilding.completelyBuilt) {
                        this._targetBuilding.addResource(this._resourceType);
                    } else {
                        this._targetBuilding.addBuildResource(this._resourceType);
                    }

                    this._character.job = null;
                }
                break;
        }

    }
}
