"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coordinates_1 = require("../utils/coordinates");
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
    // Find a storehouse with storeable resource.
    findNearestStorehouseByResource(resourceType, position) {
        const buildings = this._player.buildings.filter((building) => {
            return 'storehouse' === building.getType()
                && true === building.completelyBuilt
                && building.hasStoreableResource(resourceType);
        });
        buildings.sort((buildingA, buildingB) => {
            return coordinates_1.getDistanceFromPoints(buildingA.doorPosition, position) - coordinates_1.getDistanceFromPoints(buildingB.doorPosition, position);
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
    findNearestStorehouseWithResource(resourceType, position) {
        const buildings = this._player.buildings.filter((building) => {
            return 'storehouse' === building.getType()
                && true === building.completelyBuilt
                && 0 < building.getResourceCountByType(resourceType);
        });
        buildings.sort((buildingA, buildingB) => {
            return coordinates_1.getDistanceFromPoints(buildingA.doorPosition, position) - coordinates_1.getDistanceFromPoints(buildingB.doorPosition, position);
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
    findNearestInn(position) {
        const buildings = this._player.buildings.filter((building) => {
            return 'inn' === building.getType()
                && true === building.completelyBuilt;
        });
        buildings.sort((buildingA, buildingB) => {
            return coordinates_1.getDistanceFromPoints(buildingA.doorPosition, position) - coordinates_1.getDistanceFromPoints(buildingB.doorPosition, position);
        });
        if (0 < buildings.length) {
            return buildings[0];
        }
        return null;
    }
}
exports.default = BuildingManager;
//# sourceMappingURL=BuildingManager.js.map