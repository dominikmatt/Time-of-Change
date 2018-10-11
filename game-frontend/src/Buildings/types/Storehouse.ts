import Building from "../Building";
import PositionInterface from "../../interfaces/PositionInterface";

export default class Storehouse extends Building {
    static asset: string = 'storehouse.babylon';

    constructor(position: PositionInterface) {
        super(position, 'storehouse');
    }
}
