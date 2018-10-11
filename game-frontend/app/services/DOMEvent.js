"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DOMEvent {
    constructor() {
        this.callbackMap = {};
    }
    addEventListener(event, callback) {
        this.callbackMap[event] = callback;
        document.addEventListener(event.split('.')[0], this.callbackMap[event]);
    }
    removeEventListener(event) {
        document.removeEventListener(event.split('.')[0], this.callbackMap[event]);
        delete this.callbackMap[event];
    }
}
exports.event = new DOMEvent();
//# sourceMappingURL=DOMEvent.js.map