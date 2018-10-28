"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Building_1 = require("../Building");
class Storehouse extends Building_1.default {
    constructor(position, id, playerId) {
        super(id, position, 'storehouse', playerId);
    }
}
Storehouse.asset = 'storehouse.babylon';
exports.default = Storehouse;
//# sourceMappingURL=Storehouse.js.map