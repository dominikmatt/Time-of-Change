class EventsAbstract {
    constructor() {
        this.callbacks = [];
    }
    /**
     * Executes all callbacks. Called by the Pagination.loadNextPage().
     */
    trigger() {
        this.callbacks.forEach((callback) => callback());
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
//# sourceMappingURL=EventsAbstract.js.map