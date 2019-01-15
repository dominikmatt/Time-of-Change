"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = __importDefault(require("../Job"));
const Map_1 = __importDefault(require("../../Map/Map"));
/**
 * Transport resource to building.
 */
class TransportJob extends Job_1.default {
    constructor(player, startPosition, resourceType, targetBuilding, character, storehouse) {
        super(player);
        this._type = 'transport';
        this._resourceType = '';
        this._character = null;
        this._isCharacterWalking = false;
        this._isCharacterAtStart = false;
        this._resourceType = resourceType;
        this._startPosition = startPosition;
        this._targetBuilding = targetBuilding;
        this._character = character;
        this._storehouse = storehouse;
    }
    toJSON() {
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
            resourceType: this._resourceType,
            startPosition: this._startPosition,
            targetBuilding: this._targetBuilding.id
        });
    }
    update() {
        switch (this._currentStep) {
            case 0:
                if (!this._isCharacterWalking && !this._isCharacterAtStart) {
                    const path = Map_1.default.findRunnablePath(this._character.position.position, this._startPosition);
                    this._character.walkByPath(path);
                    this._isCharacterWalking = true;
                    this._currentStep++;
                }
                break;
            case 1:
                if (this._character.position.x === this._startPosition.x &&
                    this._character.position.z === this._startPosition.z) {
                    const storeHasResource = this._storehouse.takeOutResource(this._resourceType);
                    this._isCharacterAtStart = true;
                    this._isCharacterWalking = false;
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
                const path = Map_1.default.findRunnablePath(this._character.position.position, this._targetBuilding.doorPosition);
                this._character.walkByPath(path);
                this._isCharacterWalking = true;
                this._currentStep++;
                break;
            case 3:
                if (this._character.position.x === this._targetBuilding.doorPosition.x &&
                    this._character.position.z === this._targetBuilding.doorPosition.z) {
                    if (true === this._targetBuilding.completelyBuilt) {
                        this._targetBuilding.addResource(this._resourceType);
                    }
                    else {
                        this._targetBuilding.addBuildResource(this._resourceType);
                    }
                    this._currentStep++;
                }
                break;
            case 4:
                const outsidePath = Map_1.default.findRunnablePath(this._character.position.position, this._targetBuilding.outsidePosition);
                this._character.walkByPath(outsidePath);
                this._isCharacterWalking = true;
                this._currentStep++;
                break;
            case 5:
                if (this._character.position.x === this._targetBuilding.outsidePosition.x &&
                    this._character.position.z === this._targetBuilding.outsidePosition.z) {
                    this._character.job = null;
                }
                break;
        }
    }
}
exports.default = TransportJob;
//# sourceMappingURL=TransportJob.js.map