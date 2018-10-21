import Command from "./Command";
import {RequestInterface} from "./CommandInterface";
import panel from "../ui/panel/panel";

interface builtBuildingInterface {
    [key:string]: any;
    _id?: string;
};


/**
 * This command is executed when the panel has been updated.
 */
export default class PanelUpdateCommand extends Command {
    getCommand() {
        return 'panel.update';
    }

    execute(req: RequestInterface) {
        panel.setContent(req.content);
    }
}
