"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DOMEvent_1 = require("../../services/DOMEvent");
const connection_1 = require("../../services/connection");
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
        if (!Game_1.default.gameScene) {
            return;
        }
        const pickResult = Game_1.default.gameScene.scene.pick(Game_1.default.gameScene.scene.pointerX, Game_1.default.gameScene.scene.pointerY);
        console.log(pickResult.pickedMesh.id);
        if (null === pickResult.pickedMesh || !pickResult.pickedMesh.metadata) {
            return;
        }
        if (true === pickResult.pickedMesh.metadata.isField) {
            connection_1.default.socket.emit('panel.field.selected', {
                position: pickResult.pickedMesh.metadata.position,
            });
        }
        if (true === pickResult.pickedMesh.metadata.isBuilding && pickResult.pickedMesh.metadata.key) {
            this.selectedBuildingId = pickResult.pickedMesh.metadata.buildingId;
            connection_1.default.socket.emit('panel.building.selected', {
                buildingId: this.selectedBuildingId,
            });
        }
        if (true === pickResult.pickedMesh.metadata.isCharacter && pickResult.pickedMesh.metadata.key) {
            this.selectedCharacterId = pickResult.pickedMesh.metadata.characterId;
            connection_1.default.socket.emit('panel.character.selected', {
                characterId: this.selectedCharacterId,
            });
        }
    }
    onRightClick() {
        connection_1.default.socket.emit('panel.building.selected', {
            buildingId: null,
        });
    }
    setContent(content) {
        document.querySelector('.js-panel-content').innerHTML = content;
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
    get selectedCharacterId() {
        return this._selectedCharacterId;
    }
    set selectedCharacterId(value) {
        this._selectedCharacterId = value;
    }
}
const panel = Panel.getInstance();
exports.default = panel;
//# sourceMappingURL=panel.js.map