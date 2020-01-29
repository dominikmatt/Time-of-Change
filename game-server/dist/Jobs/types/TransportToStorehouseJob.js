"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = __importDefault(require("../Job"));
const Map_1 = __importDefault(require("../../Map/Map"));
class TransportToStorehouseJob extends Job_1.default {
    constructor(player, resourceType, building, character = null) {
        super(player);
        this._type = 'transport';
        this._storehouse = null;
        this._character = null;
        this._isCharacterWalking = false;
        this._isCharacterAtStart = false;
        this._resourceType = resourceType;
        this._character = character;
        this._building = building;
        this._resourceType = resourceType;
    }
    beforeDestroy() { }
    toJSON() {
        let storehouseId = null;
        if (null !== this._storehouse) {
            storehouseId = this._storehouse.id;
        }
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
            resourceType: this._resourceType,
            storehouse: storehouseId,
            building: this._building.id,
            toStore: true,
        });
    }
    update() {
        switch (this._currentStep) {
            // Walk to productionBuilding.
            case 0:
                if (!this._isCharacterWalking && !this._isCharacterAtStart) {
                    const path = Map_1.default.findRunnablePath(this._character.position.position, this._building.doorPosition);
                    this._character.walkByPath(path);
                    this._isCharacterWalking = true;
                    this._currentStep++;
                }
                break;
            // Take out resource from Production Building.
            case 1:
                if (this._character.position.x === this._building.doorPosition.x &&
                    this._character.position.z === this._building.doorPosition.z) {
                    this._building.decreaseStore();
                    this._reAddOnDestroy = false;
                    this._currentStep++;
                }
                break;
            // Walk to Storehouse.
            case 2:
                this._storehouse = this._player.buildingManager
                    .findNearestStorehouseByResource(this._resourceType, this._character.position.position);
                const path = Map_1.default.findRunnablePath(this._character.position.position, this._storehouse.doorPosition);
                this._character.walkByPath(path);
                this._isCharacterWalking = true;
                this._currentStep++;
                break;
            // Lay in resource to storehouse.
            case 3:
                if (this._character.position.x === this._storehouse.doorPosition.x &&
                    this._character.position.z === this._storehouse.doorPosition.z) {
                    this._currentStep++;
                    this._storehouse.putInResource(this._resourceType);
                }
                break;
            case 4:
                const outsidePath = Map_1.default.findRunnablePath(this._character.position.position, this._storehouse.outsidePosition);
                this._character.walkByPath(outsidePath);
                this._isCharacterWalking = true;
                this._currentStep++;
                break;
            case 5:
                if (this._character.position.x === this._storehouse.outsidePosition.x &&
                    this._character.position.z === this._storehouse.outsidePosition.z) {
                    this._character.job = null;
                }
                break;
        }
    }
}
exports.default = TransportToStorehouseJob;
//# sourceMappingURL=TransportToStorehouseJob.js.map