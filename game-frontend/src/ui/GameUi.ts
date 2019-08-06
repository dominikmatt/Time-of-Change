import actionHandler from "./ActionHandler";
import panel from "./panel/panel";
import GameStateChanged from "./actions/GameStateChanged";

export default class GameUi {
    constructor() {
        new GameStateChanged();
        this.bindDOMEvents();
        panel.start();
    }

    bindDOMEvents() {
        document.addEventListener('click', this.onDocumentClick.bind(this));
    }

    onDocumentClick(event: UIEvent) {
        const element: HTMLElement = event.target as HTMLElement;
        const action: string = element.dataset.uiAction;

        if (!action) {
            return;
        }

        actionHandler.handleAction(action, element);
        event.preventDefault();
    }
}
