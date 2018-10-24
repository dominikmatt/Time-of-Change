"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MapGenerator_1 = __importDefault(require("./MapGenerator"));
const Core_1 = __importDefault(require("../Core"));
const pathfinding_1 = __importDefault(require("pathfinding"));
class Map {
    constructor() {
        this._xMax = 100;
        this._zMax = 100;
        this._streetMatrix = [];
        this._treeMatrix = [];
        this.generateMatrix();
        this._mapGenerator = new MapGenerator_1.default(this);
        this._mapGenerator.generate();
    }
    static get Instance() {
        return this.instance || (this.instance = new this());
    }
    /**
     * Returns an array with all coordinates from start-position to the target.
     */
    findRunnablePath(start, target) {
        const finder = new pathfinding_1.default.AStarFinder({
        //allowDiagonal: true
        });
        const path = finder.findPath(start.x, start.z, target.x, target.z, this._runnableGrid.clone());
        return path;
    }
    /**
     * Update a coordinate with the given data.
     */
    updateCoordinate(x, z, data) {
        Object.keys(data).forEach((key) => {
            const value = data[key];
            Core_1.default.db.hset(`map:[${x},${z}]`, key, value);
            if ('runnable' === key) {
                this._runnableGrid.setWalkableAt(x, z, value);
            }
            if ('street' === key) {
                this._streetMatrix[x][z] = value ? 1 : 0;
            }
            if ('hasTree' === key) {
                this._treeMatrix[x][z] = value ? 1 : 0;
            }
        });
        Core_1.default.emitAll('map.update', Object.assign({ x: x, z: z }, data));
    }
    findTree() {
        let treePosition;
        this._treeMatrix.forEach((x, xIndex) => {
            if (treePosition) {
                return treePosition;
            }
            x.forEach((hasTree, zIndex) => {
                if (1 === hasTree) {
                    treePosition = { x: xIndex + 1, z: zIndex };
                }
            });
        });
        return treePosition;
    }
    get zMax() {
        return this._zMax;
    }
    get xMax() {
        return this._xMax;
    }
    /**
     * Generates the matrix an the grid system for the pathfinder library.
     */
    generateMatrix() {
        const runnableMatrix = [];
        for (let x = 0; x < this._xMax; x++) {
            this._streetMatrix.push([]);
            runnableMatrix.push([]);
            for (let z = 0; z < this._zMax; z++) {
                this._streetMatrix[x].push(0);
                runnableMatrix[x].push(1);
            }
        }
        this._runnableGrid = new pathfinding_1.default.Grid(runnableMatrix);
        this._treeMatrix = JSON.parse(JSON.stringify(this._streetMatrix));
    }
}
exports.default = Map.Instance;
//# sourceMappingURL=Map.js.map