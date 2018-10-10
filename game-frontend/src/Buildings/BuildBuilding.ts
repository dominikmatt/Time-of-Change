import BuildBuildingSelect from "../Events/BuildBuildingSelect";

class BuildBuilding {
    constructor() {
        BuildBuildingSelect.addCallBack(this.onBuildBuildingSelect.bind(this));
    }

    onBuildBuildingSelect() {
        console.log('Build building select');
    }
}
