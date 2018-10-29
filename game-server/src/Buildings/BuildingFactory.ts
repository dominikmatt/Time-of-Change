import Storehouse from "./types/Storehouse";
import {PositionComponent, PositionInterface} from "../Components/PositionComponent";
import Building from "./Building";
import Player from "../Player";
import Schoolhouse from "./types/Schoolhouse";
import Woodkutters from "./types/Woodkutters";

interface BuildingMapping {
    [key:string]: any;
};

const buildingMapping: BuildingMapping = {
    storehouse: Storehouse,
    schoolhouse: Schoolhouse,
    woodkutters: Woodkutters,
};

/**
 * Create a new building with given data.
 *
 * @param {string} key
 * @param {PositionComponent} position
 * @param player
 * @param alreadyBuilt
 */
export default (key: string, position: PositionInterface, player: Player, alreadyBuilt: boolean = false) => {
    const building: Building = new buildingMapping[key](player, position, alreadyBuilt);

    building.update();

    return building;
}