"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const PositionComponent_1 = require("../Components/PositionComponent");
const HealthComponent_1 = __importDefault(require("../Components/HealthComponent"));
const TransportJob_1 = __importDefault(require("../Jobs/types/TransportJob"));
const Map_1 = __importDefault(require("../Map/Map"));
/**
 * Base class for all Buildings.
 */
class Building {
    constructor(player, position) {
        this._id = uuid_1.v1();
        this._player = player;
        this._position = new PositionComponent_1.PositionComponent(position);
    }
    /**
     * Perpare start of building.
     */
    build(alreadyBuilt = false) {
        this.addHealtComponent(alreadyBuilt);
        this.updateMap();
        if (!alreadyBuilt) {
            this.addJobs();
        }
    }
    /**
     * Update map field when building starts build.
     */
    updateMap() {
        const startPosition = this._position.position;
        this._matrix.forEach((yRow, x) => {
            x = x + startPosition.x;
            yRow.forEach((type, z) => {
                z = z + startPosition.z;
                Map_1.default.updateCoordinate(x, z, {
                    runnable: type === 2,
                    building: this._id,
                    hasTree: false
                });
                // Set door position;
                if (2 === type) {
                    this.doorPosition = {
                        x: x,
                        z: z
                    };
                }
            });
        });
    }
    /**
     * This method will create all transport jobs to the jobs store.
     */
    addJobs() {
        for (let count = 0; count < this._cost.cost.stone; count++) {
            this._player.jobStore.addJob(new TransportJob_1.default(this._player, this.doorPosition, 'stone'));
        }
        for (let count = 0; count < this._cost.cost.timber; count++) {
            this._player.jobStore.addJob(new TransportJob_1.default(this._player, this.doorPosition, 'timber'));
        }
    }
    addHealtComponent(alreadyBuilt = false) {
        this._healt = new HealthComponent_1.default(this._cost.getHealth(), alreadyBuilt ? this._cost.getHealth() : 0);
    }
    /**
     * Returns building type as a string.
     */
    getType() {
        throw new Error('Building: Add getType and return your type as a string.');
    }
    /**
     * Returns all building specific data as a object.
     */
    getBuildingData() {
        throw new Error('Building: Add getBuildingData and return your building specific data as a object.');
    }
    update() {
        this.player.wsSocket.emit('building.update', {
            _id: this._id,
            type: this.getType(),
            position: this.position.position,
            data: this.getBuildingData(),
            currentHealth: this.healt.currentHealth,
            maxHealth: this.healt.maxHealth,
            matrix: this._matrix
        });
    }
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
    }
    get player() {
        return this._player;
    }
    get healt() {
        return this._healt;
    }
}
exports.default = Building;
//# sourceMappingURL=Building.js.map