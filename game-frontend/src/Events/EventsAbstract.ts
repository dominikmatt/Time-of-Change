class EventsAbstract {
    protected callbacks: Function[] = [];

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
    addCallBack(callback: Function) {
        this.callbacks.push(callback);
    }
}
