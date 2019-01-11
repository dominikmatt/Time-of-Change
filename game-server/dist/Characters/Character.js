"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const PositionComponent_1 = require("../Components/PositionComponent");
const Core_1 = __importDefault(require("../Core"));
const Map_1 = __importDefault(require("../Map/Map"));
const gameSettings_1 = require("../gameSettings");
const path_1 = require("../utils/path");
class Character {
    constructor(player, buildingId) {
        this._id = uuid_1.v1();
        this._job = null;
        this._building = null;
        this._walkTarget = null;
        this._currentPath = [];
        this._walkDelta = 0;
        this._isInHouse = false;
        let schoolhouse;
        let position = {
            x: 2,
            z: 2
        };
        this._player = player;
        if ('start' !== buildingId) {
            schoolhouse = this._player.getBuildingById(buildingId);
            position = schoolhouse.doorPosition;
        }
        this._position = new PositionComponent_1.PositionComponent(position);
    }
    getNeedBuilding() {
        return false;
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
    getBuildingType() {
        throw new Error('Character: Implement "getBuildingType" method.');
    }
    update() {
        if (true === this.getNeedBuilding() && null === this._building) {
            return this.searchBuilding();
        }
        this.checkInHouse();
        if (null === this._job) {
            this.findJob();
        }
        else {
            this._job.update();
        }
        // Do walk - ever second to the next field.
        if (0 < this._currentPath.length) {
            this._walkDelta += Core_1.default.currentTick.delta * gameSettings_1.GAME_SPEED;
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
            isWalking: 0 < this._currentPath.length,
            walkingPath: path_1.arrayPathToObject(this._currentPath),
        });
        Core_1.default.emitAll('character.update.position', {
            _id: this._id,
            type: this.getType(),
            position: this._position.position
        });
    }
    checkInHouse() {
        if (!this._position || !this._building) {
            return;
        }
        this._isInHouse = this._position.position.x === this._building.doorPosition.x && this._position.position.z === this._building.doorPosition.z;
    }
    searchBuilding() {
        const building = this._player.getBuildingByType(this.getBuildingType(), false, true);
        if (null === building) {
            return;
        }
        this._building = building;
        building.character = this;
        const path = Map_1.default.findRunnablePath(this.position.position, building.doorPosition);
        this.walkByPath(path);
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
    get building() {
        return this._building;
    }
    get isInHouse() {
        return this._isInHouse;
    }
}
exports.default = Character;
//# sourceMappingURL=Character.js.map