"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = __importDefault(require("../Job"));
const Map_1 = __importDefault(require("../../Map/Map"));
class TransportJob extends Job_1.default {
    constructor(player, startPosition, resourceType, character) {
        super(player);
        this._type = 'transport';
        this._resourceType = '';
        this._character = null;
        this._isCharacterWalking = false;
        this._isCharacterAtStart = false;
        this._resourceType = resourceType;
        this._startPosition = startPosition;
        this._character = character;
    }
    toJSON() {
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
            resourceType: this._resourceType,
            startPosition: this._startPosition
        });
    }
    update() {
        if (!this._isCharacterWalking && !this._isCharacterAtStart) {
            this._path = Map_1.default.findRunnablePath(this._character.position.position, this._startPosition);
            this._isCharacterWalking = true;
        }
        else if (this._isCharacterWalking) {
            const next = this._path.shift();
            if (next) {
                this._character.position.position = {
                    x: next[0],
                    z: next[1]
                };
            }
        }
        if (this._character.position.x === this._startPosition.x &&
            this._character.position.z === this._startPosition.z) {
            this._isCharacterAtStart = true;
            this._isCharacterWalking = false;
        }
    }
}
exports.default = TransportJob;
//# sourceMappingURL=TransportJob.js.map