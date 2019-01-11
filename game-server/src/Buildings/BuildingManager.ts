import Player from "../Player";
import Building from "./Building";
import Storehouse from "./types/Storehouse";
import ProductionBuildingInterface from "./ProductionBuildingInterface";

export default class BuildingManager {
    private readonly _player: Player;

    constructor(player: Player) {
        this._player = player;
    }

    public findBuildingById(id: string): Building {
        const building = this._player.buildings.find((building: Building): boolean => {
            return id === building.id;
        });

        return building;
    }

    public findProductionBuildingById(id: string): ProductionBuildingInterface {
        const building = this._player.buildings.find((building: Building): boolean => {
            return id === building.id;
        });

        // @ts-ignore
        return building;
    }

    // Find a storehouse with storeable resource.
    public findStorehouseByResource(resourceType: string): Storehouse {
        const buildings = this._player.buildings.filter((building: Building) => {
            return 'storehouse' === building.getType()
                && true === building.completelyBuilt
                && (<Storehouse>building).hasStoreableResource(resourceType);
        });

        if (0 < buildings.length) {
            return (<Storehouse>buildings[0]);
        }

        return null;
    }

    /**
     * Find a storehouse with minimum one resource stored.
     *
     * @param resourceType
     */
    public findStorehouseWithResource(resourceType: string): Storehouse {
        const buildings = this._player.buildings.filter((building: Building) => {
            return 'storehouse' === building.getType()
                && true === building.completelyBuilt
                && 0 < (<Storehouse>building).getResourceCountByType(resourceType);
        });

        if (0 < buildings.length) {
            return (<Storehouse>buildings[0]);
        }

        return null;
    }
}