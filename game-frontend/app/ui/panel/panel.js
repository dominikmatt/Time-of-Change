"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DOMEvent_1 = require("../../services/DOMEvent");
const Game_1 = require("../../Game");
let instance = null;
class Panel {
    static getInstance() {
        if (null === instance) {
            instance = new this();
        }
        return instance;
    }
    start() {
        this.bindDOMEvents();
    }
    bindDOMEvents() {
        DOMEvent_1.event.addEventListener('click.panel', this.onClick.bind(this));
        DOMEvent_1.event.addEventListener('contextmenu.panel', this.onRightClick.bind(this));
    }
    /**
     * This method open the correct panel when a house or some element with a action has been clicked.
     */
    onClick() {
        var pickResult = Game_1.default.gameScene.scene.pick(Game_1.default.gameScene.scene.pointerX, Game_1.default.gameScene.scene.pointerY);
        if (!pickResult.pickedMesh || !pickResult.pickedMesh.metadata || !pickResult.pickedMesh.metadata.key) {
            return;
        }
        let key = pickResult.pickedMesh.metadata.key;
        if (!pickResult.pickedMesh.metadata.isBuilding) {
            key = 'default';
        }
        this.hideAllPanels();
        this.showPanel(key);
    }
    onRightClick() {
        this.hideAllPanels();
        this.showPanel('default');
    }
    showPanel(key) {
        document.querySelector(`[data-panel-key="${key}"]`).classList.remove('is-hidden');
    }
    hideAllPanels() {
        document.querySelectorAll('[data-panel-key]')
            .forEach((element) => {
            element.classList.add('is-hidden');
        });
    }
}
const panel = Panel.getInstance();
exports.default = panel;
//# sourceMappingURL=panel.js.map