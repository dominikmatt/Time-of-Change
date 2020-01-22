"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CharacterFactory_1 = __importDefault(require("../../../Characters/CharacterFactory"));
const BuildingFactory_1 = __importDefault(require("../../../Buildings/BuildingFactory"));
const Field_1 = __importDefault(require("../../../Field/Field"));
class Player1 {
    constructor() {
    }
    placeHouses() {
        this._player.addCharacter(CharacterFactory_1.default('serf', 'start', this._player));
        this._player.addCharacter(CharacterFactory_1.default('farmer', 'start', this._player));
        this._player.addCharacter(CharacterFactory_1.default('farmer', 'start', this._player));
        const storehouse = this._player.addBuilding(BuildingFactory_1.default('storehouse', {
            x: 8,
            z: 3
        }, this._player, true));
        this._player.addBuilding(BuildingFactory_1.default('schoolhouse', { x: 8, z: 8 }, this._player, true));
        this._player.addBuilding(BuildingFactory_1.default('farm', { x: 14, z: 9 }, this._player, true));
        for (let x = 18; x < 23; x++) {
            for (let z = 9; z < 14; z++) {
                this._player.addField(new Field_1.default({
                    position: { x, z },
                }, this._player));
            }
        }
        storehouse.addResources({
            treeTrunks: 30,
            stones: 60,
            timber: 50,
            gold: 60,
            beer: 40,
            loaves: 30,
            sausages: 20,
        });
        this._player.getNearestFreeFields({ x: 0, z: 0 });
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
        const storehouse = this._player.addBuilding(BuildingFactory_1.default('storehouse', {
            x: 90,
            z: 3
        }, this._player, true));
        this._player.addBuilding(BuildingFactory_1.default('storehouse', { x: 110, z: 3 }, this._player, true));
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