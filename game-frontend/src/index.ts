import game from "./Game";
import connectionService from "./services/connection";
import MapUpdateCommand from "./Commands/MapUpdateCommand";
import BuildingUpdateCommand from "./Commands/BuildingUpdateCommand";

connectionService
    .connect()
    .then(() => {
        game.initialize();
        new MapUpdateCommand();
        new BuildingUpdateCommand();
    });
