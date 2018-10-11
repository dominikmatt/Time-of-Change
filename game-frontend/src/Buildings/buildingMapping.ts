import Storehouse from "./types/Storehouse";
import Schoolhouse from "./types/Schoolhouse";

interface BuildingMapping {
    [key:string]: any;
};

const buildingMapping: BuildingMapping = {
    storehouse: Storehouse,
    schoolhouse: Schoolhouse
};

export default buildingMapping;
