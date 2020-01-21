"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Storehouse_1 = require("./types/Storehouse");
const Schoolhouse_1 = require("./types/Schoolhouse");
const Woodcutters_1 = require("./types/Woodcutters");
const Bakery_1 = require("./types/Bakery");
const Butchers_1 = require("./types/Butchers");
const Farm_1 = require("./types/Farm");
const Inn_1 = require("./types/Inn");
const Mill_1 = require("./types/Mill");
const Mine_1 = require("./types/Mine");
const Sawmill_1 = require("./types/Sawmill");
const Smithy_1 = require("./types/Smithy");
const Quarry_1 = require("./types/Quarry");
const CharcoalBurning_1 = require("./types/CharcoalBurning");
const GoldSmithy_1 = require("./types/GoldSmithy");
const SwineFarm_1 = require("./types/SwineFarm");
const Tannery_1 = require("./types/Tannery");
const Vineyard_1 = require("./types/Vineyard");
const WeaponSmithy_1 = require("./types/WeaponSmithy");
const ArmourSmithy_1 = require("./types/ArmourSmithy");
const ArmouryWorkshop_1 = require("./types/ArmouryWorkshop");
const Barracks_1 = require("./types/Barracks");
const Tower_1 = require("./types/Tower");
const WeaponsWorkshop_1 = require("../../../game-server/src/Buildings/types/WeaponsWorkshop");
;
const buildingMapping = {
    armourSmithy: ArmourSmithy_1.default,
    armouryWorkshop: ArmouryWorkshop_1.default,
    bakery: Bakery_1.default,
    barracks: Barracks_1.default,
    butchers: Butchers_1.default,
    charcoalBurning: CharcoalBurning_1.default,
    farm: Farm_1.default,
    goldSmithy: GoldSmithy_1.default,
    inn: Inn_1.default,
    mill: Mill_1.default,
    mine: Mine_1.default,
    quarry: Quarry_1.default,
    sawmill: Sawmill_1.default,
    schoolhouse: Schoolhouse_1.default,
    smithy: Smithy_1.default,
    storehouse: Storehouse_1.default,
    swineFarm: SwineFarm_1.default,
    tannery: Tannery_1.default,
    tower: Tower_1.default,
    vineyard: Vineyard_1.default,
    weaponSmithy: WeaponSmithy_1.default,
    weaponsWorkshop: WeaponsWorkshop_1.default,
    woodcutters: Woodcutters_1.default,
};
exports.default = buildingMapping;
//# sourceMappingURL=buildingMapping.js.map