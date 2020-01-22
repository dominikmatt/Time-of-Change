import Job from "../Job";
import JobInterface from "../JobInterface";
import Player from "../../Player";
import Character from "../../Characters/Character";
import Map from "../../Map/Map";
import Storehouse from "../../Buildings/types/Storehouse";
import ProductionBuildingInterface from "../../Buildings/ProductionBuildingInterface";
import Building from "../../Buildings/Building";

export default class TransportToStorehouseJob extends Job implements JobInterface {
    protected readonly _type: string = 'transport';
    private _storehouse?: Storehouse = null;
    private readonly _character?: Character = null;
    private _isCharacterWalking: boolean = false;
    private _isCharacterAtStart: boolean = false;
    private _building: ProductionBuildingInterface;
    private _resourceType: string;

    constructor(
        player: Player,
        resourceType: string,
        building: ProductionBuildingInterface,
        character: Character | null = null,
    ) {
        super(player);

        this._resourceType = resourceType;
        this._character = character;
        this._building = building;
        this._resourceType = resourceType;
    }

    protected beforeDestroy() {}

    public toJSON(): string {
        let storehouseId: string | null = null;

        if (null !== this._storehouse) {
            storehouseId = this._storehouse.id;
        }

        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
            resourceType: this._resourceType,
            storehouse:  storehouseId,
            building: this._building.id,
            toStore: true,
        });
    }

    public update(): void {
        switch (this._currentStep) {
            // Walk to productionBuilding.
            case 0:
                if (!this._isCharacterWalking && !this._isCharacterAtStart) {
                    const path = Map.findRunnablePath(this._character.position.position, this._building.doorPosition);

                    this._character.walkByPath(path);
                    this._isCharacterWalking = true;

                    this._currentStep++;
                }
                break;
            // Take out resource from Production Building.
            case 1:
                if (this._character.position.x === this._building.doorPosition.x &&
                    this._character.position.z === this._building.doorPosition.z
                ) {
                    this._building.decreaseStore();
                    this._reAddOnDestroy = false;

                    this._currentStep++;
                }
                break;
            // Walk to Storehouse.
            case 2:
                this._storehouse = this._player.buildingManager
                    .findNearestStorehouseByResource(
                        this._resourceType,
                        this._character.position.position
                    );

                const path = Map.findRunnablePath(this._character.position.position, this._storehouse.doorPosition);
                this._character.walkByPath(path);
                this._isCharacterWalking = true;

                this._currentStep++;
                break;
            // Lay in resource to storehouse.
            case 3:
                if (this._character.position.x === this._storehouse.doorPosition.x &&
                    this._character.position.z === this._storehouse.doorPosition.z
                ) {
                    this._currentStep++;
                    this._storehouse.putInResource(this._resourceType);
                }
                break;
            case 4:
                const outsidePath = Map.findRunnablePath(this._character.position.position, this._storehouse.outsidePosition);
                this._character.walkByPath(outsidePath);
                this._isCharacterWalking = true;

                this._currentStep++;
                break;
            case 5:
                if (this._character.position.x === this._storehouse.outsidePosition.x &&
                    this._character.position.z === this._storehouse.outsidePosition.z
                ) {
                    this._character.job = null;
                }
                break;
        }
    }
}
