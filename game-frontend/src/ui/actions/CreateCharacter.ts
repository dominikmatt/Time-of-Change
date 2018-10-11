import connectionService from "../../services/connection";

export default class CreateCharacter {
    constructor(element: HTMLElement) {
        const type = element.dataset.type;

        if (!type) {
            return;
        }

        connectionService.socket.emit('character.create', {
            type: type,
        });
    }
}
