import BuildBuildingSelect from "./actions/BuildBuildingSelect";

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
                const buildBuildingSelect = new BuildBuildingSelect(element);
                break;
        }
    }
}

const actionHandler: ActionHandler = ActionHandler.getInstance();

export default actionHandler;
