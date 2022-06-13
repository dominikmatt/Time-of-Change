/**
 * Plant trees on the map.
 */
export default class MapGenerator {
    private readonly _map: any;

    constructor(map: any) {
        this._map = map;
    }

    async generate(): Promise<unknown> {
        console.log('Generate map');
        const rawTreeMatrix = require('./maps/slishou/tree-matrix.ts');
        const rawStoneMatrix = require('./maps/slishou/stone-matrix.ts');
        const rawFieldMatrix = require('./maps/slishou/field-matrix.ts');
        const rawRunnableMatrix = require('./maps/slishou/runnable-matrix.ts');
        const promises = [];

        for (let x = 0; x < this._map.xMax; x++) {
            for (let z = 0; z < this._map.zMax; z++) {
                if ('undefined' === typeof rawRunnableMatrix[x][z]) {
                    rawRunnableMatrix[x][z] = rawRunnableMatrix[x-1][z];
                }

                const hasTree: boolean = 3 === Math.floor(Math.random() * 10) && rawRunnableMatrix[x][z];

                if ('undefined' === typeof rawTreeMatrix[x][z]) {
                    rawTreeMatrix[x][z] = hasTree;
                } else {
                    rawTreeMatrix[x][z] = hasTree;
                }

                if ('undefined' === typeof rawStoneMatrix[x][z]) {
                    rawStoneMatrix[x][z] = false;
                }

                if ('undefined' === typeof rawFieldMatrix[x][z]) {
                    rawFieldMatrix[x][z] = false;
                }

                promises.push(this._map.updateCoordinate(x, z, {
                    x,
                    z,
                    runnable: !!(!rawTreeMatrix[x][z] && rawRunnableMatrix[x][z]),
                    street: false,
                    resourceKey: 'grass',
                    hasField: rawFieldMatrix[x][z],
                    hasTree: rawTreeMatrix[x][z],
                    hasStone: rawStoneMatrix[x][z],
                }));
            }
        }

        return Promise.all(promises);
    }
}
