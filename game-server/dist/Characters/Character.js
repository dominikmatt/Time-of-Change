"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const PositionComponent_1 = require("../Components/PositionComponent");
const Core_1 = __importDefault(require("../Core"));
class Character {
    constructor(player) {
        this._id = uuid_1.v1();
        this._job = null;
        console.log('create character');
        this._player = player;
        this._position = new PositionComponent_1.PositionComponent({
            x: 2,
            z: 2
        });
    }
    /**
     * Returns all character specific data as a object.
     */
    getCharacterData() {
        throw new Error('Character: Implement "getCharacterData" and return your character specific data as a object.');
    }
    /**
     * Returns character type as a string.
     */
    getType() {
        throw new Error('Character: Implement "getType" and return your type as a string.');
    }
    /**
     * Find a job and start working.
     */
    findJob() {
        throw new Error('Character: Implement "findJob" method.');
    }
    update() {
        this._player.wsSocket.emit('character.update', {
            _id: this._id,
            type: this.getType(),
            data: this.getCharacterData()
        });
        Core_1.default.emitAll('character.update.position', {
            _id: this._id,
            type: this.getType(),
            position: this._position.position
        });
        if (null === this._job) {
            this.findJob();
        }
        else {
            this._job.update();
        }
    }
    get position() {
        return this._position;
    }
}
exports.default = Character;
//# sourceMappingURL=Character.js.map