import {event} from "../../services/DOMEvent";
import connectionService from "../../services/connection";
import game from "../../Game";

let instance: Panel = null;

class Panel {
    private _selectedBuildingId: string;
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
        var pickResult = game.gameScene.scene.pick(game.gameScene.scene.pointerX, game.gameScene.scene.pointerY);

        this.selectedBuildingIsReady = true;

        if (!pickResult.pickedMesh || !pickResult.pickedMesh.metadata || !pickResult.pickedMesh.metadata.key) {
            return;
        }

        let key = pickResult.pickedMesh.metadata.key;

        if (!pickResult.pickedMesh.metadata.isBuilding) {
            key = 'default';
        } else {
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

    showPanel(key: string) {
        const element: HTMLElement = document.querySelector(`[data-panel-key="${key}"]`);

        element.classList.remove('is-hidden');

        if (false === this.selectedBuildingIsReady) {
            element.classList.add('is-not-ready');
        }
    }

    hideAllPanels() {
        document.querySelectorAll('[data-panel-key]')
            .forEach((element: HTMLElement) => {
                element.classList.add('is-hidden');
                element.classList.remove('is-not-ready');
            });
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
}

const panel: Panel = Panel.getInstance();

export default panel;
