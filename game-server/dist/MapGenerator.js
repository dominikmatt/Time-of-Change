"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Core_1 = __importDefault(require("./Core"));
const xMax = 10;
const zMax = 10;
class MapGenerator {
    constructor() {
    }
    generate() {
        for (let x = 1; x <= xMax; x++) {
            for (let z = 1; z <= zMax; z++) {
                const hasTree = 3 === Math.floor(Math.random() * 10);
                Core_1.default.db.hset(`map:[${x},${z}]`, 'x', x);
                Core_1.default.db.hset(`map:[${x},${z}]`, 'z', z);
                Core_1.default.db.hset(`map:[${x},${z}]`, 'runnable', true);
                Core_1.default.db.hset(`map:[${x},${z}]`, 'street', false);
                Core_1.default.db.hset(`map:[${x},${z}]`, 'resourceKey', 'grass');
                Core_1.default.db.hset(`map:[${x},${z}]`, 'resourceValue', 0);
                Core_1.default.db.hset(`map:[${x},${z}]`, 'hasTree', hasTree);
            }
        }
    }
}
exports.default = MapGenerator;
//# sourceMappingURL=MapGenerator.js.map