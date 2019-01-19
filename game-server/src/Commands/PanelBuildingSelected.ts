import Command from "./Command";
import {RequestInterface} from "./CommandInterface";
import Building from "../Buildings/Building";
import panel from "../Panel/panel";

/**
 * This command is executed when a player builds a new building.
 */
export default class PanelBuildingSelected extends Command {
    getCommand() {
        return 'panel.building.selected';
    }

    execute(req: RequestInterface) {
        const buildingId: string = req.buildingId;
        const building: Building|null = this.player.getBuildingById(buildingId);

        if (null !== building) {
            this.player.panel.setPanelInfo({
                id: building.id,
                type: `building-${building.getType()}`,
                data: building,
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
