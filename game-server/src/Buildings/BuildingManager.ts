import Player from "../Player";
import Building from "./Building";
import Storehouse from "./types/Storehouse";

export default class BuildingManager {
    private readonly _player: Player;

    constructor(player: Player) {
        this._player = player;
    }

    public findStorehouseWithResource(resourceType: string): Storehouse {
        const building = this._player.buildings.find((building: Building): boolean => {
            if ('storehouse' === (<Storehouse>building).getType()) {
                const stones = (<Storehouse>building).getResourceCountByType(resourceType);

                return 0 < stones;
            }
        });

        return (<Storehouse>building);
    }

    public findBuildingById(id: string): Building {
        const building = this._player.buildings.find((building: Building): boolean => {
            return id === building.id;
        });

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
}