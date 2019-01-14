"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Building_1 = require("../Building");
class Brewery extends Building_1.default {
    constructor(position, id, playerId) {
        super(id, position, 'brewery', playerId);
    }
}
exports.default = Brewery;
//# sourceMappingURL=Brewery.js.map