import Command from "./Command";
import {RequestInterface} from "./CommandInterface";
import Building from "../Buildings/Building";
import panel from "../Panel/panel";
import {PositionInterface} from "../Components/PositionComponent";
import Field from "../Field/Field";

/**
 * This command is executed when a player builds a new building.
 */
export default class PanelFieldSelected extends Command {
    getCommand() {
        return 'panel.field.selected';
    }

    execute(req: RequestInterface) {
        const position: PositionInterface = req.position;
        const field: Field|null = this.player.getFieldByPosition(position);

        if (null !== field) {
            this.player.panel.setPanelInfo({
                id: field.id,
                type: `field`,
                data: field,
            });
        } else {
            this.player.panel.setPanelInfo({
                id: null,
                type: 'default',
                data: {},
            });
        }
    }
}
