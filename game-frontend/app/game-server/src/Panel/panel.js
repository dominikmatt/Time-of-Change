"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const ejs_1 = require("ejs");
class Panel {
    constructor() {
        this._panelInfo = {
            id: null,
            type: 'default',
            data: {}
        };
    }
    static get Instance() {
        return this.instance || (this.instance = new this());
    }
    initialize() {
        setInterval(this.update.bind(this), 1000);
    }
    update() {
        this._player.wsSocket.emit('panel.update', {
            content: this.render()
        });
    }
    setPanelInfo(panelInfo) {
        this._panelInfo = panelInfo;
        this.update();
    }
    render() {
        const templateString = fs.readFileSync(`${__dirname}/../../views/Panels/${this._panelInfo.type}.ejs`, 'utf-8');
        return ejs_1.default.render(templateString, this._panelInfo.data);
    }
    get player() {
        return this._player;
    }
    set player(value) {
        this._player = value;
    }
}
exports.default = Panel;
//# sourceMappingURL=panel.js.map