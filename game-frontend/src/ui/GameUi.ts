import actionHandler from "./ActionHandler";

export default class GameUi {
    constructor() {
        this.bindDOMEvents();
    }

    bindDOMEvents() {
        document.addEventListener('click', this.onDocumentClick.bind(this));
    }

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
