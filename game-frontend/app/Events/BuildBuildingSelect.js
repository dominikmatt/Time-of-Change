"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let instance = null;
class BuildBuildingSelect extends EventsAbstract {
    static getInstance() {
        if (null === instance) {
            instance = new this();
        }
        return instance;
    }
}
const event = BuildBuildingSelect.getInstance();
exports.default = event;
//# sourceMappingURL=BuildBuildingSelect.js.map