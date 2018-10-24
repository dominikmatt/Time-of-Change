"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Building_1 = require("../Building");
class Schoolhouse extends Building_1.default {
    constructor(position, id) {
        super(id, position, 'woodkutters');
    }
}
Schoolhouse.asset = 'schoolhouse.babylon';
exports.default = Schoolhouse;
//# sourceMappingURL=Woodkutters.js.map