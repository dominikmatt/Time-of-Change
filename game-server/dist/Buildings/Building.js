"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const PositionComponent_1 = require("../Components/PositionComponent");
const HealthComponent_1 = __importDefault(require("../Components/HealthComponent"));
const TransportJob_1 = __importDefault(require("../Jobs/types/TransportJob"));
/**
 * Base class for all Buildings.
 */
class Building {
    constructor(player, position) {
        this._id = uuid_1.v1();
        this._player = player;
        this._position = new PositionComponent_1.PositionComponent(position);
    }
    build(alreadyBuilt = false) {
        this.addHealtComponent(alreadyBuilt);
        if (!alreadyBuilt) {
            this.addJobs();
        }
    }
    /**
     * This method will create all transport jobs to the jobs store.
     */
    addJobs() {
        for (let count = 0; count < this._cost.cost.stone; count++) {
            this._player.jobStore.addJob(new TransportJob_1.default(this._player, 'stone'));
        }
        for (let count = 0; count < this._cost.cost.timber; count++) {
            this._player.jobStore.addJob(new TransportJob_1.default(this._player, 'timber'));
        }
        setInterval(() => {
            this._player.jobStore.getFreeJobByType('transport')
                .then((job) => {
                console.log(job);
            });
        }, 1000);
    }
    addHealtComponent(alreadyBuilt = false) {
        this._healt = new HealthComponent_1.default(this._cost.getHealth(), alreadyBuilt ? this._cost.getHealth() : 0);
    }
    /**
     * Returns type as a string.
     *
     * @return {string}
     */
    getType() {
        throw new Error('Building: Add getType and return your type as a string.');
    }
    /**
     * Returns all building specific data as a object.
     *
     * @return {object}
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
            maxHealth: this.healt.maxHealth
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