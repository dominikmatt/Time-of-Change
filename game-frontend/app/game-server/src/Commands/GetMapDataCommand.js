"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Map_1 = require("../Map/Map");
const Command_1 = require("./Command");
const Core_1 = require("../Core");
/**
 * This command is executed when a player builds a new building.
 */
class GetMapDataCommand extends Command_1.default {
    getCommand() {
        return 'map.data';
    }
    execute(req) {
        // TOD: Create Building store.
        for (let x = 0; x < Map_1.default.xMax; x++) {
            for (let z = 0; z < Map_1.default.zMax; z++) {
                Core_1.default.db.hgetall(`map:[${x},${z}]`)
                    .then((mapData) => {
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
exports.default = GetMapDataCommand;
//# sourceMappingURL=GetMapDataCommand.js.map