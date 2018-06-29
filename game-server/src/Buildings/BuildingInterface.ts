import Player from "../Player";

export default interface BuildingInterface {
    _cost: object;

    /**
     * The mapping of the buildings size.
     * 1 = Building position
     * 2 = Entry of building
     *
     * A building with a size of 3x3 looks lile:
     * [
     *     [1,1,1]
     *     [1,1,1]
     *     [1,2,1]
     * ]
     */
    _matrix: number[][];
}