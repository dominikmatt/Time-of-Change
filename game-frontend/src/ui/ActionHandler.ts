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
                const buildBuildingSelect = new BuildBuildingSelect(element.dataset.type);
                break;
            case 'createCharacter':
                const createCharacter = new CreateCharacter(element);
                break;
            case 'addUser':
                const usernameEl: HTMLInputElement = document.querySelector('#username');
                const modalEl: HTMLElement = document.querySelector('.modal');
                const backdropEl: HTMLElement = document.querySelector('.backdrop');

                addUserEvent.trigger({
                    username: usernameEl.value,
                });
                modalEl.style.display = 'none';
                backdropEl.style.display = 'none';
                break;
        }
    }
}

const actionHandler: ActionHandler = ActionHandler.getInstance();

export default actionHandler;
