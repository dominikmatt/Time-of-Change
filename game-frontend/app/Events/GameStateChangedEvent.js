"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventsAbstract_1 = require("./EventsAbstract");
let instance = null;
class GameStateChangedEvent extends EventsAbstract_1.default {
    static getInstance() {
        if (null === instance) {
            instance = new this();
        }
        return instance;
    }
}
const event = GameStateChangedEvent.getInstance();
exports.default = event;
//# sourceMappingURL=GameStateChangedEvent.js.map