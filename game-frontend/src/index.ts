import game from "./Game";
import connectionService from "./services/connection";
import MapUpdateCommand from "./Commands/MapUpdateCommand";
import BuildingUpdateCommand from "./Commands/BuildingUpdateCommand";
import CharacterUpdateCommand from "./Commands/CharacterUpdateCommand";
import GameUi from "./ui/GameUi";
import {AddUserOptionsInterface, default as addUserEvent} from "./Events/AddUser";
import PanelUpdateCommand from "./Commands/PanelUpdateCommand";

new GameUi();

addUserEvent.addCallBack((options: AddUserOptionsInterface) => {
        connectionService
            .connect(options.username)
            .then(() => {
                game.initialize();
                new MapUpdateCommand();
                new BuildingUpdateCommand();
                new CharacterUpdateCommand();
                new PanelUpdateCommand();
            });
});
