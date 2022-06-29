"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./Game");
const connection_1 = require("./services/connection");
const GameUi_1 = require("./ui/GameUi");
const AddUser_1 = require("./Events/AddUser");
const AssetsManager_1 = require("./AssetsManager");
new GameUi_1.default();
Game_1.default.initialize();
AddUser_1.default.addCallBack((options) => {
    AssetsManager_1.default.initialize()
        .then(() => {
        connection_1.default
            .connect(options.token)
            .then(() => {
            Game_1.default.gameScene.onAssetsLoaded();
        });
    });
});
//# sourceMappingURL=index.js.map