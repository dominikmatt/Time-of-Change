import Building from "../Building";
import PositionInterface from "../../interfaces/PositionInterface";

export default class Woodkutters extends Building {
    static asset: string = 'schoolhouse.babylon';

    constructor(position: PositionInterface, id: string) {
        super(id, position, 'woodkutters');
    }
}
