"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EconomyBuilding_1 = __importDefault(require("../EconomyBuilding"));
const CostComponent_1 = __importDefault(require("../../Components/CostComponent"));
/**
 * The storehouse will store all Resources from the player.
 */
class Storehouse extends EconomyBuilding_1.default {
    constructor(player, position, alreadyBuilt = false) {
        super(player, position);
        this._matrix = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 2, 1],
        ];
        this._resources = {
            treeTrunks: {
                store: 0,
                storable: true
            },
            stones: {
                store: 0,
                storable: true
            },
            timber: {
                store: 0,
                storable: true
            },
            ironOre: {
                store: 0,
                storable: true
            },
            goldOre: {
                store: 0,
                storable: true
            },
            coal: {
                store: 0,
                storable: true
            },
            iron: {
                store: 0,
                storable: true
            },
            gold: {
                store: 0,
                storable: true
            },
            wine: {
                store: 0,
                storable: true
            },
            corn: {
                store: 0,
                storable: true
            },
            loaves: {
                store: 0,
                storable: true
            },
            flour: {
                store: 0,
                storable: true
            },
            leather: {
                store: 0,
                storable: true
            },
            sausages: {
                store: 0,
                storable: true
            },
            pigs: {
                store: 0,
                storable: true
            },
            skins: {
                store: 0,
                storable: true
            },
            woodenShield: {
                store: 0,
                storable: true
            },
            longShield: {
                store: 0,
                storable: true
            },
            leatherArmor: {
                store: 0,
                storable: true
            },
            ironAmament: {
                store: 0,
                storable: true
            },
            handAxe: {
                store: 0,
                storable: true
            },
            sword: {
                store: 0,
                storable: true
            },
            lance: {
                store: 0,
                storable: true
            },
            pike: {
                store: 0,
                storable: true
            },
            longbow: {
                store: 0,
                storable: true
            },
            crossbow: {
                store: 0,
                storable: true
            },
            horses: {
                store: 0,
                storable: true
            },
            fish: {
                store: 0,
                storable: true
            }
        };
        this._cost = new CostComponent_1.default({
            timber: 6,
            stone: 5
        });
        this.build(alreadyBuilt);
    }
    addResources(resources) {
        for (let resKey in resources) {
            this._resources[resKey].store += resources[resKey];
        }
    }
    getType() {
        return 'storehouse';
    }
    getBuildingData() {
        return {
            resources: this._resources
        };
    }
}
exports.default = Storehouse;
//# sourceMappingURL=Storehouse.js.map