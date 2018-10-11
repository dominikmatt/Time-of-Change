"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const PositionComponent_1 = require("../Components/PositionComponent");
const HealthComponent_1 = require("../Components/HealthComponent");
const TransportJob_1 = require("../Jobs/types/TransportJob");
const Map_1 = require("../Map/Map");
const BuildJob_1 = require("../Jobs/types/BuildJob");
/**
 * Base class for all Buildings.
 */
class Building {
    constructor(player, position) {
        this._id = uuid_1.v1();
        this._buildResources = {
            stones: 0,
            timber: 0
        };
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
            this.addTransportJobs();
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
    addTransportJobs() {
        for (let count = 0; count < this._cost.cost.stones; count++) {
            this._player.jobStore.addJob(new TransportJob_1.default(this._player, this.doorPosition, 'stones', this));
        }
        for (let count = 0; count < this._cost.cost.timber; count++) {
            this._player.jobStore.addJob(new TransportJob_1.default(this._player, this.doorPosition, 'timber', this));
        }
    }
    /**
     * This method will create all transport jobs to the jobs store.
     */
    addBuildJob() {
        this._player.jobStore.addJob(new BuildJob_1.default(this._player, this));
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
    addBuildResource(type) {
        this._buildResources[type]++;
        this.addBuildJob();
    }
    increaseHealt() {
        this._healt.currentHealth += 50;
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
    get id() {
        return this._id;
    }
}
exports.default = Building;
//# sourceMappingURL=Building.js.map