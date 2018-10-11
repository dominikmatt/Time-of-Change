"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildBuildingSelect_1 = require("../Events/BuildBuildingSelect");
class BuildBuilding {
    constructor() {
        BuildBuildingSelect_1.default.addCallBack(this.onBuildBuildingSelect.bind(this));
    }
    onBuildBuildingSelect() {
        console.log('Build building select');
    }
}
//# sourceMappingURL=BuildBuilding.js.map