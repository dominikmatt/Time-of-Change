import actionHandler from "./ActionHandler";
import panel from "./panel/panel";

export default class GameUi {
    constructor() {
        this.bindDOMEvents();
        panel.start();
    }

    bindDOMEvents() {
        document.addEventListener('click', this.onDocumentClick.bind(this));
    }WW

    onDocumentClick(event: UIEvent) {
        const element: HTMLElement = event.target as HTMLElement;
        const action: string = element.dataset.uiAction;

        event.preventDefault();

        if (!action) {
            return;
        }

        actionHandler.handleAction(action, element);
    }
}
