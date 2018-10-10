"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingFactory_1 = require("./Buildings/BuildingFactory");
const BuildBuildingCommand_1 = require("./Commands/BuildBuildingCommand");
const JobStore_1 = require("./Jobs/JobStore");
const Redis_1 = require("./Redis");
const Core_1 = require("./Core");
const GetMapDataCommand_1 = require("./Commands/GetMapDataCommand");
const CreateCharacterCommand_1 = require("./Commands/CreateCharacterCommand");
const BuildingManager_1 = require("./Buildings/BuildingManager");
const CharacterFactory_1 = require("./Characters/CharacterFactory");
class Player {
    constructor(name, token) {
        this._buildings = [];
        this._characters = [];
        this._name = name;
        this._token = token;
        this._db = new Redis_1.default(Object.keys(Core_1.default.players).length + 1);
        this._jobStore = new JobStore_1.default(this);
        this._buildingManager = new BuildingManager_1.default(this);
        this._db.flushdb()
            .then(() => console.log('database cleared'))
            .catch((error) => { throw new Error(error); });
        Core_1.default.db.hset(`players:${this._token}`, 'name', this._name);
        Core_1.default.db.hset(`players:${this._token}`, 'isMaster', Object.keys(Core_1.default.players).length === 0);
    }
    initializeTown() {
        /** @var Storehouse storehouse */
        const hero = this.addCharacter(CharacterFactory_1.default('hero', this));
        const storehouse = this.addBuilding(BuildingFactory_1.default('storehouse', { x: 3, z: 3 }, this, true));
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
        new GetMapDataCommand_1.default(this);
        new CreateCharacterCommand_1.default(this);
    }
    update() {
        this._buildings.forEach((building) => {
            building.update();
        });
        this._characters.forEach((character) => {
            character.update();
        });
        this._jobStore.update();
    }
    /**
     * Add a new building to the buildings list.
     *
     * @param {Building} building
     */
    addBuilding(building) {
        this._buildings.push(building);
        return building;
    }
    /**
     * Add a new building to the buildings list.
     */
    addCharacter(character) {
        this._characters.push(character);
        return character;
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
    get jobStore() {
        return this._jobStore;
    }
    get db() {
        return this._db;
    }
    get buildings() {
        return this._buildings;
    }
    get buildingManager() {
        return this._buildingManager;
    }
}
exports.default = Player;
;
//# sourceMappingURL=Player.js.map