import MapGenerator from "./MapGenerator";
import Core from "../Core";
import {PositionInterface} from "../Components/PositionComponent";
import PF from "pathfinding";

class Map {
    private static instance: Map;

    private readonly _mapGenerator: MapGenerator;

    private _xMax: number = 100;

    private _zMax: number = 100;

    private _streetMatrix: number[][] = [];

    public _treeMatrix: number[][] = [];

    private _runnableGrid: PF.Grid;

    constructor() {
        this.generateMatrix();

        this._mapGenerator = new MapGenerator(this);

        this._mapGenerator.generate();
    }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    /**
     * Returns an array with all coordinates from start-position to the target.
     */
    public findRunnablePath(start: PositionInterface, target: PositionInterface): number[][] {
        const finder = new PF.AStarFinder({
            //allowDiagonal: true
        });
        const path = finder.findPath(
            start.x,
            start.z,
            target.x,
            target.z,
            this._runnableGrid.clone()
        );

        return path;
    }

    /**
     * Update a coordinate with the given data.
     */
    public updateCoordinate(x: number, z: number, data: any) {
        Object.keys(data).forEach((key: string) => {
            const value: any = data[key];

            Core.db.hset(`map:[${x},${z}]`, key, value);

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

        Core.emitAll('map.update', {
            x: x,
            z: z,
            ...data
        });
    }

    findTree() {
        let treePosition: PositionInterface;

        this._treeMatrix.forEach((x: any, xIndex: number) => {
            if (treePosition) {
                return treePosition;
            }

            x.forEach((hasTree: number, zIndex: number) => {
                if (1 === hasTree) {
                    treePosition = {x: xIndex + 1, z: zIndex};
                }
            });
        });

        return treePosition;
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
    }
}

export default Map.Instance;
