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
        const pickResult = Game_1.default.gameScene.scene.pick(Game_1.default.gameScene.scene.pointerX, Game_1.default.gameScene.scene.pointerY);
        this.selectedBuildingIsReady = true;
        if (null === pickResult.pickedMesh || !pickResult.pickedMesh.metadata || !pickResult.pickedMesh.metadata.key) {
            return;
        }
        let key = pickResult.pickedMesh.metadata.key;
        if (!pickResult.pickedMesh.metadata.isBuilding) {
            key = 'default';
        }
        else {
            this.selectedBuildingId = pickResult.pickedMesh.metadata.buildingId;
            this.selectedBuildingIsReady = pickResult.pickedMesh.metadata.isReady;
        }
        this.hideAllPanels();
        this.showPanel(key);
    }
    onRightClick() {
        this.hideAllPanels();
        this.showPanel('default');
    }
    showPanel(key) {
        const element = document.querySelector(`[data-panel-key="${key}"]`);
        element.classList.remove('is-hidden');
        if (false === this.selectedBuildingIsReady) {
            element.classList.add('is-not-ready');
        }
    }
    hideAllPanels() {
        document.querySelectorAll('[data-panel-key]')
            .forEach((element) => {
            element.classList.add('is-hidden');
            element.classList.remove('is-not-ready');
        });
    }
    get selectedBuildingId() {
        return this._selectedBuildingId;
    }
    set selectedBuildingId(selectedBuildingId) {
        this._selectedBuildingId = selectedBuildingId;
    }
    get selectedBuildingIsReady() {
        return this._selectedBuildingIsReady;
    }
    set selectedBuildingIsReady(value) {
        this._selectedBuildingIsReady = value;
    }
}
const panel = Panel.getInstance();
exports.default = panel;
//# sourceMappingURL=panel.js.map