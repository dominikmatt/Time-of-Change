"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionHandler_1 = require("./ActionHandler");
const panel_1 = require("./panel/panel");
class GameUi {
    constructor() {
        this.bindDOMEvents();
        panel_1.default.start();
    }
    bindDOMEvents() {
        document.addEventListener('click', this.onDocumentClick.bind(this));
    }
    onDocumentClick(event) {
        const element = event.target;
        const action = element.dataset.uiAction;
        if (!action) {
            return;
        }
        ActionHandler_1.default.handleAction(action, element);
    }
}
exports.default = GameUi;
//# sourceMappingURL=GameUi.js.map