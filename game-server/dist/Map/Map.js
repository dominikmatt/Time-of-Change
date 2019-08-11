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
        this._stoneMatrix = [];
        this._fieldMatrix = [];
        this._mapSettings = require('./maps/slishou/map-settings');
        this._xMax = this._mapSettings.size.x;
        this._zMax = this._mapSettings.size.z;
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
    findRunnablePath(start, target, lastPositionRunnable = false) {
        const runnableGrid = this._runnableGrid.clone();
        // allowDiagonal not in d.ts file.
        // @ts-ignore
        const finder = new pathfinding_1.default.AStarFinder({ allowDiagonal: true });
        if (true === lastPositionRunnable) {
            runnableGrid.setWalkableAt(target.x, target.z, true);
        }
        const path = finder.findPath(start.x, start.z, target.x, target.z, runnableGrid);
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
            if ('hasStone' === key) {
                this._stoneMatrix[x][z] = value ? 1 : 0;
            }
            if ('field' === key) {
                this._fieldMatrix[x][z] = value;
            }
        });
        Core_1.default.emitAll('map.update', Object.assign({ x: x, z: z }, data));
    }
    /**
     * Returns the nearest tree from a position on the map.
     *
     * @param startPosition
     */
    findTree(startPosition) {
        let treePosition = null;
        let lastDista = null;
        // Calculate distance.
        const distance = (start, end) => {
            return Math.sqrt(Math.pow(Math.abs(start.x - end.x), 2) +
                Math.pow(Math.abs(start.z - end.z), 2) +
                Math.pow(Math.abs(start.z - end.z), 2));
        };
        // Find nearest tree from doorPosition.
        this._treeMatrix.forEach((row, x) => {
            row.forEach((hasTree, z) => {
                const dista = distance({
                    x,
                    z
                }, startPosition);
                if (null === lastDista || (dista < lastDista && 1 === hasTree)) {
                    lastDista = dista;
                    treePosition = { x: x, z: z };
                }
            });
        });
        return treePosition;
    }
    /**
     * Returns the nearest stone from a position on the map.
     *
     * @param startPosition
     */
    findStone(startPosition) {
        let stonePosition = null;
        let lastDista = null;
        // Calculate distance.
        const distance = (start, end) => {
            return Math.sqrt(Math.pow(Math.abs(start.x - end.x), 2) +
                Math.pow(Math.abs(start.z - end.z), 2) +
                Math.pow(Math.abs(start.z - end.z), 2));
        };
        // Find nearest stone from doorPosition.
        this._stoneMatrix.forEach((row, x) => {
            row.forEach((hasStone, z) => {
                const dista = distance({
                    x,
                    z
                }, startPosition);
                if (null === lastDista || (dista < lastDista && 1 === hasStone)) {
                    lastDista = dista;
                    stonePosition = { x: x, z: z };
                }
            });
        });
        // Find nearest tree from doorPosition.
        this._stoneMatrix.forEach((row, x) => {
            row.forEach((hasStone, z) => {
                const dista = distance({
                    x,
                    z
                }, startPosition);
                if (null === lastDista || (dista < lastDista && 1 === hasStone)) {
                    lastDista = dista;
                    stonePosition = { x: x, z: z };
                }
            });
        });
        return stonePosition;
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
        this._stoneMatrix = JSON.parse(JSON.stringify(this._streetMatrix));
        this._fieldMatrix = JSON.parse(JSON.stringify(this._streetMatrix));
    }
}
exports.default = Map.Instance;
//# sourceMappingURL=Map.js.map