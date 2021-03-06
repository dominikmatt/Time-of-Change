import MapStartupInterface from "../../../Interfaces/MapStartup";
import Player from "../../../Player";
import CharacterFactory from "../../../Characters/CharacterFactory";
import BuildingFactory from "../../../Buildings/BuildingFactory";
import Storehouse from "../../../Buildings/types/Storehouse";
import Field from "../../../Field/Field";

class Player1 implements MapStartupInterface {
    private _player: Player;

    public constructor() {

    }

    public placeHouses() {
        this._player.addCharacter(CharacterFactory('serf', 'start', this._player));
        this._player.addCharacter(CharacterFactory('farmer', 'start', this._player));
        this._player.addCharacter(CharacterFactory('miller', 'start', this._player));
        const storehouse: Storehouse = this._player.addBuilding(BuildingFactory('storehouse', {
            x: 8,
            z: 3
        }, this._player, true));

        this._player.addBuilding(BuildingFactory('schoolhouse', {x: 8, z: 8}, this._player, true));
        this._player.addBuilding(BuildingFactory('farm', {x: 14, z: 9}, this._player, true));
        this._player.addBuilding(BuildingFactory('mill', {x: 14, z: 15}, this._player, true));
        for (let x = 18; x < 23; x++) {
         for (let z = 9; z < 14; z++) {
             this._player.addField(new Field(
                 {
                     position: {x, z},
                 },
                 this._player,
             ));
         }
        }

        storehouse.addResources({
            corn: 20,
            treeTrunks: 32,
            stones: 60,
            timber: 50,
            gold: 60,
            loaves: 30,
            sausages: 20,
            flour: 20,
        });

        this._player.getNearestFreeFields({x:0, z: 0});
    }

    set player(value: Player) {
        this._player = value;
    }
}

class Player2 implements MapStartupInterface {
    private _player: Player;

    public constructor() {

    }

    public placeHouses() {
        this._player.addCharacter(CharacterFactory('serf', 'start', this._player));
        const storehouse: Storehouse = this._player.addBuilding(BuildingFactory('storehouse', {
            x: 90,
            z: 3
        }, this._player, true));
        this._player.addBuilding(BuildingFactory('storehouse', {x: 110, z: 3}, this._player, true));

        this._player.addBuilding(BuildingFactory('schoolhouse', {x: 90, z: 8}, this._player, true));

        storehouse.addResources({
            treeTrunks: 30,
            stones: 60,
            timber: 50,
            gold: 60,
            beer: 40,
            loaves: 30,
            sausages: 20,
            flour: 20,
            corn: 20,
        });
    }

    set player(value: Player) {
        this._player = value;
    }
};

module.exports = [
    new Player1(),
    new Player2()
];