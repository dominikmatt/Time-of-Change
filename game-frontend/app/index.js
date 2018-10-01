"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./Game");
const connection_1 = require("./services/connection");
const MapUpdateCommand_1 = require("./Commands/MapUpdateCommand");
const BuildingUpdateCommand_1 = require("./Commands/BuildingUpdateCommand");
const CharacterUpdateCommand_1 = require("./Commands/CharacterUpdateCommand");
connection_1.default
    .connect()
    .then(() => {
    Game_1.default.initialize();
    new MapUpdateCommand_1.default();
    new BuildingUpdateCommand_1.default();
    new CharacterUpdateCommand_1.default();
});
//# sourceMappingURL=index.js.map