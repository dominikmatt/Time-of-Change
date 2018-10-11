interface CallbacksObject {
    [key: string]: any
}

class DOMEvent {
    private callbackMap: CallbacksObject = {};

    addEventListener(event: string, callback: Function) {
        this.callbackMap[event] = callback;
        document.addEventListener(event.split('.')[0], this.callbackMap[event]);
    }

    removeEventListener(event: string) {
        document.removeEventListener(event.split('.')[0], this.callbackMap[event]);
        delete this.callbackMap[event];
    }
}

export const event = new DOMEvent();
