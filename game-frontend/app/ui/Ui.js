class Ui {
    constructor() {
        this.bindDOMEvents();
    }
    bindDOMEvents() {
        document.addEventListener('click', this.onDocumentClick.bind(this));
    }
    onDocumentClick(event) {
        console.log(event);
        event.preventDefault();
    }
}
//# sourceMappingURL=Ui.js.map