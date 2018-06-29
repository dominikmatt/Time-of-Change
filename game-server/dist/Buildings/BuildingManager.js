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
}
exports.default = BuildingManager;
//# sourceMappingURL=BuildingManager.js.map