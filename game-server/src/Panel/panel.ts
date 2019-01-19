import Player from "../Player";
import * as fs from "fs";
import ejs from 'ejs';

interface PanelInfo {
    id: string|null;
    type: string;
    data: Object|null;
}

class Panel {
    private static instance: Panel;
    private _player: Player;
    private _panelInfo: PanelInfo = {
        id: null,
        type: 'default',
        data: {}
    };

    constructor() {
    }

    public static get Instance() {
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

    setPanelInfo(panelInfo: PanelInfo) {
        this._panelInfo = panelInfo;

        this.update();
    }

    render() {
        console.log(this._panelInfo, this._player.playerId);
        const templateString: string = fs.readFileSync(`${__dirname}/../../views/Panels/${this._panelInfo.type}.ejs`, 'utf-8');

        return ejs.render(templateString, this._panelInfo.data);
    }

    get player(): Player {
        return this._player;
    }

    set player(value: Player) {
        this._player = value;
    }
}

export default Panel;
