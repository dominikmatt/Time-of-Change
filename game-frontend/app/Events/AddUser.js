"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventsAbstract_1 = require("./EventsAbstract");
let instance = null;
class AddUser extends EventsAbstract_1.default {
    static getInstance() {
        if (null === instance) {
            instance = new this();
        }
        return instance;
    }
}
const event = AddUser.getInstance();
exports.default = event;
//# sourceMappingURL=AddUser.js.map