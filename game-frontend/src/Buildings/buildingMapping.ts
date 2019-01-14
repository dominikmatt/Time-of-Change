import Storehouse from "./types/Storehouse";
import Schoolhouse from "./types/Schoolhouse";
import Woodcutters from "./types/Woodcutters";
import Bakery from "./types/Bakery";
import Brewery from "./types/Brewery";
import Butchers from "./types/Butchers";
import Farm from "./types/Farm";
import Inn from "./types/Inn";
import Mill from "./types/Mill";
import Mine from "./types/Mine";
import Sawmill from "./types/Sawmill";
import Smithy from "./types/Smithy";
import Quarry from "./types/Quarry";

interface BuildingMapping {
    [key:string]: any;
};

const buildingMapping: BuildingMapping = {
    storehouse: Storehouse,
    schoolhouse: Schoolhouse,
    woodcutters: Woodcutters,
    bakery: Bakery,
    brewery: Brewery,
    butchers: Butchers,
    farm: Farm,
    inn: Inn,
    mill: Mill,
    mine: Mine,
    quarry: Quarry,
    sawmill: Sawmill,
    smithy: Smithy,
};

export default buildingMapping;
