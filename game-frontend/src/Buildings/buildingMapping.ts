import Storehouse from "./types/Storehouse";
import Schoolhouse from "./types/Schoolhouse";
import Woodcutters from "./types/Woodcutters";
import Bakery from "./types/Bakery";
import Butchers from "./types/Butchers";
import Farm from "./types/Farm";
import Inn from "./types/Inn";
import Mill from "./types/Mill";
import Mine from "./types/Mine";
import Sawmill from "./types/Sawmill";
import Smithy from "./types/Smithy";
import Quarry from "./types/Quarry";
import CharcoalBurning from "./types/CharcoalBurning";
import GoldSmithy from "./types/GoldSmithy";
import SwineFarm from "./types/SwineFarm";
import Tannery from "./types/Tannery";
import Vineyard from "./types/Vineyard";
import WeaponSmithy from "./types/WeaponSmithy";
import ArmourSmithy from "./types/ArmourSmithy";
import ArmouryWorkshop from "./types/ArmouryWorkshop";
import Barracks from "./types/Barracks";
import Tower from "./types/Tower";
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

export default buildingMapping;
