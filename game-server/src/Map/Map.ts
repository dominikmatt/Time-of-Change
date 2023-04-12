import MapGenerator from "./MapGenerator";
import Core from "../Core";
import {PositionInterface} from "../Components/PositionComponent";
import PF from "pathfinding";
import MapSettingsInterface from "../Interfaces/MapSettings";
import has = Reflect.has;
import {MapDataInterface} from "./MapDataInterface";

class Map {
    private static instance: Map;

    private readonly _mapGenerator: MapGenerator;

    private _xMax: number = 100;

    private _zMax: number = 100;

    private _streetMatrix: number[][] = [];

    public _treeMatrix: number[][] = [];
    public _stoneMatrix: number[][] = [];
    public _fieldMatrix: number[][] = [];

    private _runnableGrid: PF.Grid;
    private _mapSettings: MapSettingsInterface;

    constructor() {
        this._mapSettings = require('./maps/slishou/map-settings');
        this._xMax = this._mapSettings.size.x;
        this._zMax = this._mapSettings.size.z;

        this.generateMatrix();

        this._mapGenerator = new MapGenerator(this);
    }

    public async generateMap() {
        return this._mapGenerator.generate();
    }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    /**
     * Returns an array with all coordinatesaa from start-position to the target.
     */
    public findRunnablePath(
        start: PositionInterface,
        target: PositionInterface,
        lastPositionRunnable: boolean = false
    ): number[][] {
        const runnableGrid = this._runnableGrid.clone();

        // allowDiagonal not in d.ts file.
        // @ts-ignore
        const finder = new PF.AStarFinder({ allowDiagonal: true });

        if (true === lastPositionRunnable) {
            runnableGrid.setWalkableAt(target.x, target.z, true);
        }

        const path = finder.findPath(
            start.x,
            start.z,
            target.x,
            target.z,
            runnableGrid
        );

        return path;
    }

    /**
     * Update a coordinate with the given data.
     */
    public async updateCoordinate(x: number, z: number, data: any) {
        const promises: unknown[] = [];

        try {
            Object.keys(data).forEach((key: string) => {
                const value: any = data[key];

                if (null !== value) { // @fixme Save null values on redis
                    promises.push(Core.db.hset(`map:[${x},${z}]`, key, value.toString()))
                }

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

                if ('hasField' === key) {
                    this._fieldMatrix[x][z] = value;
                }
            });

            const eventData: MapDataInterface = {
                x: x,
                z: z,
                ...data,
            };

            Core.emitAll('map.update', eventData);

            return Promise.all(promises);
        } catch (error) {
            console.error(error);
            console.error(`Not able to update coordinates with data (${x}:${z}, ${JSON.stringify(data)})`)
        }
    }

    /**
     * Returns the nearest tree from a position on the map.
     *
     * @param startPosition
     */
    findTree(startPosition: PositionInterface): PositionInterface {
        let treePosition: PositionInterface = null;
        let lastDista: Number = null;

        // Calculate distance.
        const distance = (start: PositionInterface, end: PositionInterface) => {
            return Math.sqrt(Math.pow(Math.abs(start.x-end.x),2) +
                Math.pow(Math.abs(start.z-end.z),2) +
                Math.pow(Math.abs(start.z-end.z),2));
        };

        // Find nearest tree from doorPosition.
        this._treeMatrix.forEach((row, x) => {
            row.forEach((hasTree, z) => {
                const dista = distance({
                        x,
                        z
                    },
                    startPosition
                );

                if (null === lastDista || (dista < lastDista && 1 === hasTree)) {
                    lastDista = dista;
                    treePosition = {x: x, z: z};
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
    findStone(startPosition: PositionInterface): PositionInterface {
        let stonePosition: PositionInterface = null;
        let lastDista: Number = null;

        // Calculate distance.
        const distance = (start: PositionInterface, end: PositionInterface) => {
            return Math.sqrt(Math.pow(Math.abs(start.x-end.x),2) +
                Math.pow(Math.abs(start.z-end.z),2) +
                Math.pow(Math.abs(start.z-end.z),2));
        };

        // Find nearest stone from doorPosition.
        this._stoneMatrix.forEach((row, x) => {
            row.forEach((hasStone, z) => {
                const dista = distance({
                        x,
                        z
                    },
                    startPosition
                );

                if (null === lastDista || (dista < lastDista && 1 === hasStone)) {
                    lastDista = dista;
                    stonePosition = {x: x, z: z};
                }
            });
        });

        // Find nearest tree from doorPosition.
        this._stoneMatrix.forEach((row, x) => {
            row.forEach((hasStone, z) => {
                const dista = distance({
                        x,
                        z
                    },
                    startPosition
                );

                if (null === lastDista || (dista < lastDista && 1 === hasStone)) {
                    lastDista = dista;
                    stonePosition = {x: x, z: z};
                }
            });
        });

        return stonePosition;
    }

    get zMax(): number {
        return this._zMax;
    }

    get xMax(): number {
        return this._xMax;
    }

    /**
     * Generates the matrix an the grid system for the pathfinder library.
     */
    private generateMatrix() {
        const runnableMatrix: number[][] = [];

        for (let x = 0; x < this._xMax; x++) {
            this._streetMatrix.push([]);
            runnableMatrix.push([]);

            for (let z = 0; z < this._zMax; z++) {
                (<any>this._streetMatrix[x]).push(0);
                (<any>runnableMatrix[x]).push(1);
            }
        }


        this._runnableGrid = new PF.Grid(runnableMatrix);
        this._treeMatrix = JSON.parse(JSON.stringify(this._streetMatrix));
        this._stoneMatrix = JSON.parse(JSON.stringify(this._streetMatrix));
        this._fieldMatrix = JSON.parse(JSON.stringify(this._streetMatrix));
    }
}

export default Map.Instance;
