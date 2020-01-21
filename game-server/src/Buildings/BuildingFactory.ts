import Storehouse from "./types/Storehouse";
import {PositionComponent, PositionInterface} from "../Components/PositionComponent";
import Building from "./Building";
import Player from "../Player";
import Schoolhouse from "./types/Schoolhouse";
import Woodcutters from "./types/Woodcutters";
import Bakery from "./types/Bakery";
import Vineyard from "./types/Vineyard";
import Butchers from "./types/Butchers";
import Farm from "./types/Farm";
import Inn from "./types/Inn";
import Mill from "./types/Mill";
import Mine from "./types/Mine";
import Quarry from "./types/Quarry";
import Sawmill from "./types/Sawmill";
import Smithy from "./types/Smithy";
import ArmourSmithy from "./types/ArmourSmithy";
import ArmouryWorkshop from "./types/ArmouryWorkshop";
import Barracks from "./types/Barracks";
import CharcoalBurning from "./types/CharcoalBurning";
import GoldSmithy from "./types/GoldSmithy";
import SwineFarm from "./types/SwineFarm";
import Tannery from "./types/Tannery";
import Tower from "./types/Tower";
import WeaponSmithy from "./types/WeaponSmithy";
import WeaponsWorkshop from "./types/WeaponsWorkshop";

interface BuildingMapping {
    [key:string]: any;
};

const buildingMapping: BuildingMapping = {
    armourSmithy: ArmourSmithy,
    armouryWorkshop: ArmouryWorkshop,
    bakery: Bakery,
    barracks: Barracks,
    butchers: Butchers,
    charcoalBurning: CharcoalBurning,
    farm: Farm,
    goldSmithy: GoldSmithy,
    inn: Inn,
    mill: Mill,
    mine: Mine,
    quarry: Quarry,
    sawmill: Sawmill,
    schoolhouse: Schoolhouse,
    smithy: Smithy,
    storehouse: Storehouse,
    swineFarm: SwineFarm,
    tannery: Tannery,
    tower: Tower,
    vineyard: Vineyard,
    weaponSmithy: WeaponSmithy,
    weaponsWorkshop: WeaponsWorkshop,
    woodcutters: Woodcutters,
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
    console.log(key)
    const building: Building = new buildingMapping[key](player, position, alreadyBuilt);

    return building;
}