import Building from "../Building";
import PositionInterface from "../../interfaces/PositionInterface";

export default class Woodkutters extends Building {
    static asset: string = 'woodkutters.babylon';

    constructor(position: PositionInterface, id: string, playerId: number) {
        super(id, position, 'woodkutters', playerId);
    }
}
