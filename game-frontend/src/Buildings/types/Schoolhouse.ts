import Building from "../Building";
import PositionInterface from "../../interfaces/PositionInterface";

export default class Schoolhouse extends Building {
    static asset: string = 'schoolhouse.babylon';

    constructor(position: PositionInterface) {
        super(position, 'schoolhouse');
    }
}
