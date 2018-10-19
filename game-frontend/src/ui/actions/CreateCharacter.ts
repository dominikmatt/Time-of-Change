import connectionService from "../../services/connection";
import panel from "../panel/panel";

export default class CreateCharacter {
    constructor(element: HTMLElement) {
        const type = element.dataset.type;

        if (!type) {
            return;
        }

        connectionService.socket.emit('character.create', {
            type: type,
            buildingId: panel.selectedBuildingId,
        });
    }
}
