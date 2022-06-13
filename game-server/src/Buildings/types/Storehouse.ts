import EconomyBuilding from "../EconomyBuilding";
import BuildingInterface from "../BuildingInterface";
import CostComponent from "../../Components/CostComponent";
import {AllResourceInterface, ResourceInterface} from "../../Interfaces/Resources";
import {PositionInterface} from "../../Components/PositionComponent";
import Player from "../../Player";

interface ResourceItemInterface {
    store: number;
    storable: boolean;
}


/**
 * The storehouse will store all Resources from the player.
 */
export default class Storehouse extends EconomyBuilding implements BuildingInterface {
    readonly _matrix: number[][] = [
        [1,1,1],
        [1,1,1],
        [1,2,1],
    ];

    protected _resources: AllResourceInterface<ResourceItemInterface> = {
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
        vine: {
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
    };

    constructor(player: Player, position: PositionInterface, alreadyBuilt: boolean = false) {
        super(player, position);

        this._cost = new CostComponent({
            timber: 6,
            stones: 5
        });

        this.build(alreadyBuilt);
    }

    public addResources(resources: ResourceInterface<number>) {
        for (let resKey in resources) {
            this._resources[resKey].store += (<any>resources)[resKey];
        }
    }

    protected getBuildingData() {
        return {
            resources: this._resources
        }
    }

    public getResourceCountByType(resourceType: string): number {
        return this._resources[resourceType].store;
    }

    public takeOutResource(resourceType: string): boolean {
        if (0 < this._resources[resourceType].store) {
            this._resources[resourceType].store--;

            return true;
        }

        return false;
    }

    public putInResource(resourceType: string): boolean {
        this._resources[resourceType].store++;

        return true;
    }

    public hasStoreableResource(resourceType: string): boolean {
        return this._resources[resourceType].storable;
    }


    get resources(): ResourceInterface {
        return this._resources;
    }
}
