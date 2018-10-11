import BuildBuildingSelect from "./actions/BuildBuildingSelect";
import CreateCharacter from "./actions/CreateCharacter";
import {default as addUserEvent} from "./../Events/AddUser";

let instance: ActionHandler = null;

class ActionHandler {
    public static getInstance(): ActionHandler {
        if (null === instance) {
            instance = new this();
        }

        return instance;
    }

    handleAction(action: string, element: HTMLElement) {
        switch (action) {
            case 'buildBuildingSelect':
                const buildBuildingSelect = new BuildBuildingSelect();
                break;
            case 'createCharacter':
                const createCharacter = new CreateCharacter(element);
                break;
            case 'addUser':
                addUserEvent.trigger({
                    username: document.querySelector('#username').value,
                });
                document.querySelector('.modal').style.display = 'none';
                document.querySelector('.backdrop').style.display = 'none';
                break;
        }
    }
}

const actionHandler: ActionHandler = ActionHandler.getInstance();

export default actionHandler;
