"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const PositionComponent_1 = require("../Components/PositionComponent");
const Core_1 = require("../Core");
class Character {
    constructor(player) {
        this._id = uuid_1.v1();
        this._job = null;
        this._currentPath = [];
        this._walkDelta = 0;
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
        if (null === this._job) {
            this.findJob();
        }
        else {
            this._job.update();
        }
        // Do walk - ever second to the next field.
        if (0 < this._currentPath.length) {
            this._walkDelta += Core_1.default.currentTick.delta;
            if (1 <= this._walkDelta) {
                const next = this._currentPath.shift();
                if (next) {
                    this.position.position = {
                        x: next[0],
                        z: next[1]
                    };
                }
                this._walkDelta = 0;
            }
        }
        this._player.wsSocket.emit('character.update', {
            _id: this._id,
            type: this.getType(),
            data: this.getCharacterData(),
            position: this.position.position,
        });
        Core_1.default.emitAll('character.update.position', {
            _id: this._id,
            type: this.getType(),
            position: this._position.position
        });
    }
    walkByPath(path) {
        this._currentPath = path;
        this._walkDelta = 0;
    }
    get position() {
        return this._position;
    }
    set job(value) {
        this._job = value;
    }
}
exports.default = Character;
//# sourceMappingURL=Character.js.map