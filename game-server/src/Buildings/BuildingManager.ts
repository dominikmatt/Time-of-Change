import Player from "../Player";
import Building from "./Building";
import Storehouse from "./types/Storehouse";
import ProductionBuildingInterface from "./ProductionBuildingInterface";
import {getDistanceFromPoints} from "../utils/coordinates";
import {PositionInterface} from "../Components/PositionComponent";

export default class BuildingManager {
    private readonly _player: Player;

    constructor(player: Player) {
        this._player = player;
    }

    public findBuildingById(id: string): Building {
        const building = this._player.buildings.find((building: Building): boolean => {
            return id === building.id;
        });

        return (<Building>building);
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
        const buildings = this._player.buildings.filter((building: Storehouse) => {
            return 'storehouse' === building.getType()
                && true === building.completelyBuilt
                && building.hasStoreableResource(resourceType);
        });

        if (0 < buildings.length) {
            return (<Storehouse>buildings[0]);
        }

        return null;
    }

    // Find a storehouse with storeable resource.
    public findNearestStorehouseByResource(resourceType: string, position: PositionInterface): Storehouse {
        const buildings = this._player.buildings.filter((building: Storehouse) => {
            return 'storehouse' === building.getType()
                && true === building.completelyBuilt
                && building.hasStoreableResource(resourceType);
        });

        buildings.sort((buildingA: Storehouse, buildingB: Storehouse) => {
            return getDistanceFromPoints(buildingA.doorPosition, position) - getDistanceFromPoints(buildingB.doorPosition, position);
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
    public findNearestStorehouseWithResource(resourceType: string, position: PositionInterface): Storehouse {
        const buildings = this._player.buildings.filter((building: Storehouse) => {
            return 'storehouse' === building.getType()
                && true === building.completelyBuilt
                && 0 < building.getResourceCountByType(resourceType);
        });

        buildings.sort((buildingA: Building, buildingB: Building): number => {
            return getDistanceFromPoints(buildingA.doorPosition, position) - getDistanceFromPoints(buildingB.doorPosition, position);
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
    public findNearestInn<T extends Building>(position: PositionInterface): T {
        const buildings = this._player.buildings.filter((building: T) => {
            return 'inn' === building.getType()
                && true === building.completelyBuilt;
        });

        buildings.sort((buildingA: Building, buildingB: Building): number => {
            return getDistanceFromPoints(buildingA.doorPosition, position) - getDistanceFromPoints(buildingB.doorPosition, position);
        });

        if (0 < buildings.length) {
            return (<T>buildings[0]);
        }

        return null;
    }
}