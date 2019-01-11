"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BuildingManager {
    constructor(player) {
        this._player = player;
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
    /**
     * Find a storehouse with minimum one resource stored.
     *
     * @param resourceType
     */
    findStorehouseWithResource(resourceType) {
        const buildings = this._player.buildings.filter((building) => {
            return 'storehouse' === building.getType()
                && true === building.completelyBuilt
                && 0 < building.getResourceCountByType(resourceType);
        });
        if (0 < buildings.length) {
            return buildings[0];
        }
        return null;
    }
}
exports.default = BuildingManager;
//# sourceMappingURL=BuildingManager.js.map