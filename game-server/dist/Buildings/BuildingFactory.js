"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Storehouse_1 = __importDefault(require("./types/Storehouse"));
const Schoolhouse_1 = __importDefault(require("./types/Schoolhouse"));
const Woodcutters_1 = __importDefault(require("./types/Woodcutters"));
const Bakery_1 = __importDefault(require("./types/Bakery"));
const Vineyard_1 = __importDefault(require("./types/Vineyard"));
const Butchers_1 = __importDefault(require("./types/Butchers"));
const Farm_1 = __importDefault(require("./types/Farm"));
const Inn_1 = __importDefault(require("./types/Inn"));
const Mill_1 = __importDefault(require("./types/Mill"));
const Mine_1 = __importDefault(require("./types/Mine"));
const Quarry_1 = __importDefault(require("./types/Quarry"));
const Sawmill_1 = __importDefault(require("./types/Sawmill"));
const Smithy_1 = __importDefault(require("./types/Smithy"));
const ArmourSmithy_1 = __importDefault(require("./types/ArmourSmithy"));
const ArmouryWorkshop_1 = __importDefault(require("./types/ArmouryWorkshop"));
const Barracks_1 = __importDefault(require("./types/Barracks"));
const CharcoalBurning_1 = __importDefault(require("./types/CharcoalBurning"));
const GoldSmithy_1 = __importDefault(require("./types/GoldSmithy"));
const SwineFarm_1 = __importDefault(require("./types/SwineFarm"));
const Tannery_1 = __importDefault(require("./types/Tannery"));
const Tower_1 = __importDefault(require("./types/Tower"));
const WeaponSmithy_1 = __importDefault(require("./types/WeaponSmithy"));
const WeaponsWorkshop_1 = __importDefault(require("./types/WeaponsWorkshop"));
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
/**
 * Create a new building with given data.
 *
 * @param {string} key
 * @param {PositionComponent} position
 * @param player
 * @param alreadyBuilt
 */
exports.default = (key, position, player, alreadyBuilt = false) => {
    console.log(key);
    const building = new buildingMapping[key](player, position, alreadyBuilt);
    return building;
};
//# sourceMappingURL=BuildingFactory.js.map