"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../../services/connection");
class CreateCharacter {
    constructor(element) {
        const type = element.dataset.type;
        if (!type) {
            return;
        }
        connection_1.default.socket.emit('character.create', {
            type: type,
        });
    }
}
exports.default = CreateCharacter;
//# sourceMappingURL=CreateCharacter.js.map