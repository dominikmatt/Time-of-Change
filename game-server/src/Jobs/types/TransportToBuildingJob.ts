import Job from "../Job";
import JobInterface from "../JobInterface";
import Player from "../../Player";
import Character from "../../Characters/Character";
import Map from "../../Map/Map";
import Storehouse from "../../Buildings/types/Storehouse";
import ProductionBuildingInterface from "../../Buildings/ProductionBuildingInterface";
import Building from "../../Buildings/Building";

export default class TransportToBuildingJob extends Job implements JobInterface {
    protected readonly _type: string = 'transport';
    private _fromStorehouse?: Storehouse = null;
    private readonly _character?: Character = null;
    private _isCharacterWalking: boolean = false;
    private _isCharacterAtStart: boolean = false;
    private _toBuilding: ProductionBuildingInterface;
    private _resourceType: string;

    constructor(
        player: Player,
        resourceType: string,
        toBuilding: ProductionBuildingInterface,
        character: Character | null = null,
    ) {
        super(player);

        this._resourceType = resourceType;
        this._character = character;
        this._toBuilding = toBuilding;
        this._resourceType = resourceType;

        console.log('add');
    }

    public toJSON(): string {
        let storehouseId: string | null = null;

        if (null !== this._fromStorehouse) {
            storehouseId = this._fromStorehouse.id;
        }

        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
            resourceType: this._resourceType,
            fromStorehouse:  storehouseId,
            toBuilding: this._toBuilding.id,
            toStore: true,
        });
    }

    public update(): void {
        console.log(this._currentStep);
        switch (this._currentStep) {
            // Find and walk to storehouse.
            case 0:
                console.log(0);

                //this._fromStorehouse = this._player.buildingManager.findStorehouseWithResource(this._resourceType);
                console.log(this._fromStorehouse);
                break;
            // Take out resource from Storehouse.
            case 1:

                break;
            // Walk to Production building.
            case 2:

                break;
            // Lay in resource to production building.
            case 3:

                break;
        }
    }
}
