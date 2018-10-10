"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildBuildingSelect_1 = require("./actions/BuildBuildingSelect");
let instance = null;
class ActionHandler {
    static getInstance() {
        if (null === instance) {
            instance = new this();
        }
        return instance;
    }
    handleAction(action, element) {
        switch (action) {
            case 'buildBuildingSelect':
                const buildBuildingSelect = new BuildBuildingSelect_1.default(element);
                break;
        }
    }
}
const actionHandler = ActionHandler.getInstance();
exports.default = actionHandler;
//# sourceMappingURL=ActionHandler.js.map