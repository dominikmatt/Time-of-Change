"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../../services/connection");
const panel_1 = require("../panel/panel");
class CreateCharacter {
    constructor(element) {
        const type = element.dataset.type;
        if (!type) {
            return;
        }
        connection_1.default.socket.emit('character.create', {
            type: type,
            buildingId: panel_1.default.selectedBuildingId,
        });
    }
}
exports.default = CreateCharacter;
//# sourceMappingURL=CreateCharacter.js.map