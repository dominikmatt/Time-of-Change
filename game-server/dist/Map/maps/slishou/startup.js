"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CharacterFactory_1 = __importDefault(require("../../../Characters/CharacterFactory"));
const BuildingFactory_1 = __importDefault(require("../../../Buildings/BuildingFactory"));
class Player1 {
    constructor() {
    }
    placeHouses() {
        this._player.addCharacter(CharacterFactory_1.default('serf', 'start', this._player));
        const storehouse = this._player.addBuilding(BuildingFactory_1.default('storehouse', { x: 8, z: 3 }, this._player, true));
        this._player.addBuilding(BuildingFactory_1.default('schoolhouse', { x: 8, z: 8 }, this._player, true));
        storehouse.addResources({
            treeTrunks: 30,
            stones: 60,
            timber: 50,
            gold: 60,
            beer: 40,
            loaves: 30,
            sausages: 20,
        });
    }
    set player(value) {
        this._player = value;
    }
}
;
class Player2 {
    constructor() {
    }
    placeHouses() {
        this._player.addCharacter(CharacterFactory_1.default('serf', 'start', this._player));
        const storehouse = this._player.addBuilding(BuildingFactory_1.default('storehouse', { x: 90, z: 3 }, this._player, true));
        this._player.addBuilding(BuildingFactory_1.default('schoolhouse', { x: 90, z: 8 }, this._player, true));
        storehouse.addResources({
            treeTrunks: 30,
            stones: 60,
            timber: 50,
            gold: 60,
            beer: 40,
            loaves: 30,
            sausages: 20,
        });
    }
    set player(value) {
        this._player = value;
    }
}
;
module.exports = [
    new Player1(),
    new Player2()
];
//# sourceMappingURL=startup.js.map