"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const ejs_1 = __importDefault(require("ejs"));
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
exports.default = Panel.Instance;
//# sourceMappingURL=panel.js.map