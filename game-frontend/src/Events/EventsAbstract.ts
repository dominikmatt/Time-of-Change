export default class EventsAbstract {
    protected callbacks: Function[] = [];

    /**
     * Executes all callbacks. Called by the Pagination.loadNextPage().
     */
    trigger(options: object) {
        this.callbacks.forEach((callback) => callback(options));
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
