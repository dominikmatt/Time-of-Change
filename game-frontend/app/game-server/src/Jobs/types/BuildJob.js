"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = require("../Job");
const Map_1 = require("../../Map/Map");
class BuildJob extends Job_1.default {
    constructor(player, targetBuilding, character) {
        super(player);
        this._type = 'build';
        this._character = null;
        this._isCharacterWalking = false;
        this._isCharacterAtStart = false;
        this._targetBuilding = targetBuilding;
        this._character = character;
    }
    toJSON() {
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
            targetBuilding: this._targetBuilding.id
        });
    }
    update() {
        switch (this._currentStep) {
            case 0:
                if (!this._isCharacterWalking && !this._isCharacterAtStart) {
                    const path = Map_1.default.findRunnablePath(this._character.position.position, this._targetBuilding.doorPosition);
                    this._character.walkByPath(path);
                    this._isCharacterWalking = true;
                    this._currentStep++;
                }
                break;
            case 1:
                if (this._character.position.x === this._targetBuilding.doorPosition.x &&
                    this._character.position.z === this._targetBuilding.doorPosition.z) {
                    this._isCharacterAtStart = true;
                    this._isCharacterWalking = false;
                    setTimeout(() => {
                        if (1 !== this._currentStep) {
                            return;
                        }
                        this._currentStep++;
                    }, 5000);
                }
                break;
            case 2:
                this._targetBuilding.increaseHealth();
                this._currentStep++;
                break;
            case 3:
                const outsidePath = Map_1.default.findRunnablePath(this._character.position.position, this._targetBuilding.outsidePosition);
                this._character.walkByPath(outsidePath);
                this._isCharacterWalking = true;
                this._currentStep++;
                break;
            case 4:
                if (this._character.position.x === this._targetBuilding.outsidePosition.x &&
                    this._character.position.z === this._targetBuilding.outsidePosition.z) {
                    this._character.job = null;
                }
                break;
        }
    }
}
exports.default = BuildJob;
//# sourceMappingURL=BuildJob.js.map