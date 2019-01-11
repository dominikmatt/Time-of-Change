"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BuildingManager {
    constructor(player) {
        this._player = player;
    }
    findStorehouseWithResource(resourceType) {
        const building = this._player.buildings.find((building) => {
            if ('storehouse' === building.getType()) {
                const stones = building.getResourceCountByType(resourceType);
                return 0 < stones;
            }
        });
        return building;
    }
    findBuildingById(id) {
        const building = this._player.buildings.find((building) => {
            return id === building.id;
        });
        return building;
    }
    findProductionBuildingById(id) {
        const building = this._player.buildings.find((building) => {
            return id === building.id;
        });
        // @ts-ignore
        return building;
    }
    // Find a storehouse with storeable resource.
    findStorehouseByResource(resourceType) {
        const buildings = this._player.buildings.filter((building) => {
            return 'storehouse' === building.getType()
                && true === building.completelyBuilt
                && building.hasStoreableResource(resourceType);
        });
        if (0 < buildings.length) {
            return buildings[0];
        }
        return null;
    }
}
exports.default = BuildingManager;
//# sourceMappingURL=BuildingManager.js.map