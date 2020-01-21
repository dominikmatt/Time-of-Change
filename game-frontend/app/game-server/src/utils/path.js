"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Maps the pathfinder multidimensional array to a object array like:
 * [
 *  {x: 1, y: 2},
 *  {x: 1, y: 3},
 *  {x: 1, y: 4},
 * ]
 * @param path
 */
exports.arrayPathToObject = (path) => {
    return path.map((point) => {
        return {
            x: point[0],
            z: point[1]
        };
    });
};
//# sourceMappingURL=path.js.map