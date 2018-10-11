"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventsAbstract {
    constructor() {
        this.callbacks = [];
    }
    /**
     * Executes all callbacks. Called by the Pagination.loadNextPage().
     */
    trigger(options) {
        this.callbacks.forEach((callback) => callback(options));
    }
    /**
     * Adds one callback to the array.
     *
     * @param callback
     */
    addCallBack(callback) {
        this.callbacks.push(callback);
    }
}
exports.default = EventsAbstract;
//# sourceMappingURL=EventsAbstract.js.map