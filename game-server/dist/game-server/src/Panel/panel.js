"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Panel {
    constructor() {
        setInterval(this.update.bind(this), 1000);
    }
    static get Instance() {
        return this.instance || (this.instance = new this());
    }
    update() {
        this._player.wsSocket.emit('panel.update', {
            content: 'test'
        });
    }
    get player() {
        return this._player;
    }
    set player(value) {
        this._player = value;
    }
}
exports.default = Panel.Instance;
//# sourceMappingURL=panel.js.map