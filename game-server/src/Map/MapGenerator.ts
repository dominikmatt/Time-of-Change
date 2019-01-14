/**
 * Plant trees on the map.
 */
export default class MapGenerator {
    private readonly _map: any;

    constructor(map: any) {
        this._map = map;
    }

    generate() {
        for (let x = 0; x < this._map.xMax; x++) {
            for (let z = 0; z < this._map.zMax; z++) {
                const hasTree: boolean = 3 === Math.floor(Math.random() * 10);

                this._map.updateCoordinate(x, z, {
                    x,
                    z,
                    runnable: !hasTree,
                    street: false,
                    resourceKey: 'grass',
                    hasTree
                });
            }
        }
    }
}
