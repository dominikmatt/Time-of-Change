"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Building_1 = __importDefault(require("./Building"));
/**
 * Economy Buildings are buildings to store and produce date for the economy.
 */
class EconomyBuilding extends Building_1.default {
    constructor(position) {
        super(position);
    }
}
exports.default = EconomyBuilding;
//# sourceMappingURL=EconomyBuilding.js.map