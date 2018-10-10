let instance: BuildBuildingSelect = null;

class BuildBuildingSelect extends EventsAbstract{
    public static getInstance(): BuildBuildingSelect {
        if (null === instance) {
            instance = new this();
        }

        return instance;
    }
}

const event: EventsAbstract = BuildBuildingSelect.getInstance();

export default event;
