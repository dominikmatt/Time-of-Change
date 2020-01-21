"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Building_1 = require("../Building");
class Tower extends Building_1.default {
    constructor(position, id, playerId) {
        super(id, position, 'bakery', playerId);
    }
}
exports.default = Tower;
//# sourceMappingURL=Tower.js.map