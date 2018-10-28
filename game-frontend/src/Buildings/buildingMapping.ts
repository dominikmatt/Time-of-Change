import Storehouse from "./types/Storehouse";
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

export default buildingMapping;
