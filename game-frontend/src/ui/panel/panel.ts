import * as BABYLON from 'babylonjs'
import {event} from "../../services/DOMEvent";
import connectionService from "../../services/connection";
import game from "../../Game";

let instance: Panel = null;

class Panel {
    private _selectedBuildingId: string;
    private _selectedFieldId: string;
    private _selectedCharacterId: string;
    private _selectedBuildingIsReady: boolean;

    public static getInstance(): Panel {
        if (null === instance) {
            instance = new this();
        }

        return instance;
    }

    start() {
        this.bindDOMEvents();
    }

    bindDOMEvents() {
        event.addEventListener('click.panel', this.onClick.bind(this));
        event.addEventListener('contextmenu.panel', this.onRightClick.bind(this));
    }

    /**
     * This method open the correct panel when a house or some element with a action has been clicked.
     */
    onClick() {
        if (!game.gameScene) {
            return ;
        }

        const pickResult: BABYLON.PickingInfo | null = game.gameScene.scene.pick(game.gameScene.scene.pointerX, game.gameScene.scene.pointerY);

        console.log(pickResult.pickedMesh.id)
        if (null === pickResult.pickedMesh || !pickResult.pickedMesh.metadata) {
            return;
        }

        if (true === pickResult.pickedMesh.metadata.isField) {
            connectionService.socket.emit('panel.field.selected', {
                position: pickResult.pickedMesh.metadata.position,
            });
        }

        if (true === pickResult.pickedMesh.metadata.isBuilding && pickResult.pickedMesh.metadata.key) {
            this.selectedBuildingId = pickResult.pickedMesh.metadata.buildingId;

            connectionService.socket.emit('panel.building.selected', {
                buildingId: this.selectedBuildingId,
            });
        }

        if (true === pickResult.pickedMesh.metadata.isCharacter && pickResult.pickedMesh.metadata.key) {
            this.selectedCharacterId = pickResult.pickedMesh.metadata.characterId;

            connectionService.socket.emit('panel.character.selected', {
                characterId: this.selectedCharacterId,
            });
        }
    }

    onRightClick() {
        connectionService.socket.emit('panel.building.selected', {
            buildingId: null,
        });
    }

    setContent(content: string) {
        document.querySelector('.js-panel-content').innerHTML = content;
    }

    get selectedBuildingId(): string {
        return this._selectedBuildingId;
    }

    set selectedBuildingId(selectedBuildingId: string) {
        this._selectedBuildingId = selectedBuildingId;
    }

    get selectedBuildingIsReady(): boolean {
        return this._selectedBuildingIsReady;
    }

    set selectedBuildingIsReady(value: boolean) {
        this._selectedBuildingIsReady = value;
    }

    get selectedCharacterId(): string {
        return this._selectedCharacterId;
    }

    set selectedCharacterId(value: string) {
        this._selectedCharacterId = value;
    }
}

const panel: Panel = Panel.getInstance();

export default panel;
