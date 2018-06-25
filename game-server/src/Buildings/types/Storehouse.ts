import EconomyBuilding from "../EconomyBuilding";
import BuildingInterface from "../BuildingInterface";
import CostComponent from "../../Components/CostComponent";
import {ResourceInterface as AllResourceInterface} from "../../Interfaces/Resources";
import {PositionInterface} from "../../Components/PositionComponent";

interface ResourceItemInterface {
    store: number;
    storable: boolean;
}

interface ResourceInterface extends AllResourceInterface {
    treeTrunks: ResourceItemInterface;
    stones: ResourceItemInterface;
    timber: ResourceItemInterface;
    ironOre: ResourceItemInterface;
    goldOre: ResourceItemInterface;
    coal: ResourceItemInterface;
    iron: ResourceItemInterface;
    gold: ResourceItemInterface;
    wine: ResourceItemInterface;
    corn: ResourceItemInterface;
    loaves: ResourceItemInterface;
    flour: ResourceItemInterface;
    leather: ResourceItemInterface;
    sausages: ResourceItemInterface;
    pigs: ResourceItemInterface;
    skins: ResourceItemInterface;
    woodenShield: ResourceItemInterface;
    longShield: ResourceItemInterface;
    leatherArmor: ResourceItemInterface;
    ironAmament: ResourceItemInterface;
    handAxe: ResourceItemInterface;
    sword: ResourceItemInterface;
    lance: ResourceItemInterface;
    pike: ResourceItemInterface;
    longbow: ResourceItemInterface;
    crossbow: ResourceItemInterface;
    horses: ResourceItemInterface;
    fish: ResourceItemInterface;
    [key: string]: ResourceItemInterface;
}

/**
 * The storehouse will store all Resources from the player.
 */
export default class Storehouse extends EconomyBuilding implements BuildingInterface {
    private _resources: ResourceInterface = {
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

    constructor(position: PositionInterface, alreadyBuilt: boolean = false) {
        super(position);

        this._cost = new CostComponent({
            timber: 6,
            stone: 5
        });

        this.build(alreadyBuilt);
    }

    public addResources(resources: object) {
        for (let resKey in resources) {
            this._resources[resKey].store += (<any>resources)[resKey];
        }
    }

    protected getType() {
        return 'storehouse';
    }

    protected getBuildingData() {
        return {
            resources: this._resources
        }
    }
}