import game from "./Game";
import connectionService from "./services/connection";
import MapUpdateCommand from "./Commands/MapUpdateCommand";
import BuildingUpdateCommand from "./Commands/BuildingUpdateCommand";
import CharacterUpdateCommand from "./Commands/CharacterUpdateCommand";

connectionService
    .connect()
    .then(() => {
        game.initialize();
        new MapUpdateCommand();
        new BuildingUpdateCommand();
        new CharacterUpdateCommand();
    });
