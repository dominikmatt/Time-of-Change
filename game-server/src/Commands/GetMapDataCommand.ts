import Map from "../Map/Map";
import Command from "./Command";
import {RequestInterface} from "./CommandInterface";
import Core from "../Core";
import {MapDataInterface} from "../Map/MapDataInterface";

/**
 * This command is executed when a player builds a new building.
 */
export default class GetMapDataCommand extends Command {
    getCommand() {
        return 'map.data';
    }

    execute(req: RequestInterface) {
        // TOD: Create Building store.
        for (let x = 0; x < Map.xMax; x++) {
            for (let z = 0; z < Map.zMax; z++) {
                Core.db.hgetall(`map:[${x},${z}]`)
                    .then((mapData: MapDataInterface) => {
                        mapData.x = parseInt(mapData.x);
                        mapData.z = parseInt(mapData.z);
                        mapData.runnable = 'true' === mapData.runnable;
                        mapData.hasTree = 'true' === mapData.hasTree;
                        mapData.hasStone = 'true' === mapData.hasStone;
                        mapData.hasField = 'true' === mapData.hasField;

                        this.player.wsSocket.emit('map.update', mapData);
                    });
            }
        }
    }
}
