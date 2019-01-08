/**
 * Maps the pathfinder multidimensional array to a object array like:
 * [
 *  {x: 1, y: 2},
 *  {x: 1, y: 3},
 *  {x: 1, y: 4},
 * ]
 * @param path
 */
export const arrayPathToObject = (path: number[][]) => {
    return path.map((point: number[]) => {
        return {
            x: point[0],
            z: point[1]
        };
    });
};