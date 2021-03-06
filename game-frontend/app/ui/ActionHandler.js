"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildBuildingSelect_1 = require("./actions/BuildBuildingSelect");
const CreateCharacter_1 = require("./actions/CreateCharacter");
const AddUser_1 = require("./../Events/AddUser");
const BuildFieldSelect_1 = require("./actions/BuildFieldSelect");
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
                const buildBuildingSelect = new BuildBuildingSelect_1.default(element.dataset.type);
                break;
            case 'buildFieldSelect':
                const buildFieldSelect = new BuildFieldSelect_1.default();
                break;
            case 'createCharacter':
                const createCharacter = new CreateCharacter_1.default(element);
                break;
            case 'addUser':
                const tokenEl = document.querySelector('#token');
                const modalEl = document.querySelector('.modal');
                const backdropEl = document.querySelector('.backdrop');
                AddUser_1.default.trigger({
                    token: tokenEl.value,
                });
                modalEl.style.display = 'none';
                backdropEl.style.display = 'none';
                break;
        }
    }
}
const actionHandler = ActionHandler.getInstance();
exports.default = actionHandler;
//# sourceMappingURL=ActionHandler.js.map