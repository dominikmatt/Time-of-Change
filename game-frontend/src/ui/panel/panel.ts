import {event} from "../../services/DOMEvent";
import connectionService from "../../services/connection";
import game from "../../Game";

let instance: Panel = null;

class Panel {
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

    showPanel(key: string) {
        document.querySelector(`[data-panel-key="${key}"]`).classList.remove('is-hidden');
    }

    hideAllPanels() {
        document.querySelectorAll('[data-panel-key]')
            .forEach((element: HTMLElement) => {
                element.classList.add('is-hidden')
            });
    }
}

const panel: Panel = Panel.getInstance();

export default panel;
