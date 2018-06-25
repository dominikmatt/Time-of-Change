"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingFactory_1 = __importDefault(require("./Buildings/BuildingFactory"));
const BuildBuildingCommand_1 = __importDefault(require("./Commands/BuildBuildingCommand"));
const jobStore_1 = __importDefault(require("./Jobs/jobStore"));
const Redis_1 = __importDefault(require("./Redis"));
class Player {
    constructor(name, token) {
        this.buildings = [];
        this._name = name;
        this._token = token;
        this._database = new Redis_1.default(this);
        this._database.hset('players', this._name, this._token, false);
    }
    initializeTown() {
        /** @var Storehouse storehouse */
        const storehouse = this.addBuilding(BuildingFactory_1.default('storehouse', { x: 10, y: 0, z: 0 }, this, true));
        storehouse.addResources({
            stones: 60,
            timber: 50,
            gold: 60,
            wine: 40,
            loaves: 30,
            sausages: 20,
        });
    }
    /**
     * Bin websocket event listeners.
     */
    listenWs() {
        new BuildBuildingCommand_1.default(this);
    }
    update() {
        this.buildings.forEach((building) => {
            building.update();
        });
        jobStore_1.default.update();
    }
    /**
     * Add a new building to the buildings list.
     *
     * @param {Building} building
     */
    addBuilding(building) {
        this.buildings.push(building);
        return building;
    }
    get name() {
        return this._name;
    }
    get token() {
        return this._token;
    }
    get wsSocket() {
        return this._wsSocket;
    }
    set wsSocket(value) {
        this._wsSocket = value;
    }
    get database() {
        return this._database;
    }
}
exports.default = Player;
;
//# sourceMappingURL=Player.js.map