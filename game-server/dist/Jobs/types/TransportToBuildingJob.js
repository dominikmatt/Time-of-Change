"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = __importDefault(require("../Job"));
class TransportToBuildingJob extends Job_1.default {
    constructor(player, resourceType, toBuilding, character = null) {
        super(player);
        this._type = 'transport';
        this._fromStorehouse = null;
        this._character = null;
        this._isCharacterWalking = false;
        this._isCharacterAtStart = false;
        this._resourceType = resourceType;
        this._character = character;
        this._toBuilding = toBuilding;
        this._resourceType = resourceType;
    }
    toJSON() {
        let storehouseId = null;
        if (null !== this._fromStorehouse) {
            storehouseId = this._fromStorehouse.id;
        }
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
            resourceType: this._resourceType,
            fromStorehouse: storehouseId,
            toBuilding: this._toBuilding.id,
            toStore: true,
        });
    }
    update() {
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
exports.default = TransportToBuildingJob;
//# sourceMappingURL=TransportToBuildingJob.js.map