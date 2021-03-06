"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const PositionComponent_1 = require("../Components/PositionComponent");
const HealthComponent_1 = require("../Components/HealthComponent");
const TransportJob_1 = require("../Jobs/types/TransportJob");
const Map_1 = require("../Map/Map");
const BuildJob_1 = require("../Jobs/types/BuildJob");
const Core_1 = require("./../Core");
/**
 * Base class for all Buildings.
 */
class Building {
    constructor(player, position) {
        this._id = uuid_1.v1();
        this._character = null;
        this._nextJob = null;
        this._buildResources = {
            stones: 0,
            timber: 0
        };
        this._resources = {};
        this._completelyBuilt = false;
        this._player = player;
        this._position = new PositionComponent_1.PositionComponent(position);
    }
    /**
     * Perpare start of building.
     */
    build(alreadyBuilt = false) {
        this.addHealthComponent(alreadyBuilt);
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
                    hasField: false,
                    hasTree: false,
                    hasStone: false,
                });
                // Set door position;
                if (2 === type) {
                    this.doorPosition = {
                        x: x,
                        z: z
                    };
                    this.outsidePosition = {
                        x: x,
                        z: z
                    };
                    this.outsidePosition.x++;
                }
            });
        });
        Map_1.default.updateCoordinate(this.outsidePosition.x, this.outsidePosition.z, {
            runnable: true,
            building: this._id,
            hasField: false,
            hasTree: false,
            hasStone: false,
        });
    }
    beforeUpdate() { }
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
    addHealthComponent(alreadyBuilt = false) {
        this._health = new HealthComponent_1.default(this, this._cost.getHealth(), alreadyBuilt ? this._cost.getHealth() : 0);
    }
    /**
     * Returns building type as a string.
     */
    getType() {
        const name = this.constructor.name;
        return name.charAt(0).toLowerCase() + name.substring(1);
    }
    /**
     * Returns all building specific data as a object.
     */
    getBuildingData() {
        throw new Error('Building: Add getBuildingData and return your building specific data as a object.');
    }
    update(delta) {
        this.beforeUpdate();
        if (this._health.maxHealth === this._health.currentHealth) {
            this._completelyBuilt = true;
        }
        Core_1.default.emitAll('building.update', {
            _id: this._id,
            type: this.getType(),
            position: this.position.position,
            data: this.getBuildingData(),
            playerId: this._player.playerId,
            currentHealth: this.health.currentHealth,
            maxHealth: this.health.maxHealth,
            matrix: this._matrix
        });
    }
    destroy() {
        throw new Error('Implement destroy on Buildings.');
    }
    afterResourceAdded(type) { }
    addBuildResource(type) {
        this._buildResources[type]++;
        this.addBuildJob();
    }
    addResource(type) {
        this._resources[type]++;
        this.afterResourceAdded(type);
    }
    increaseHealth() {
        this._health.currentHealth += 50;
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
    get health() {
        return this._health;
    }
    get id() {
        return this._id;
    }
    get completelyBuilt() {
        return this._completelyBuilt;
    }
    get character() {
        return this._character;
    }
    set character(value) {
        this._character = value;
    }
    get nextJob() {
        return this._nextJob;
    }
}
exports.default = Building;
//# sourceMappingURL=Building.js.map