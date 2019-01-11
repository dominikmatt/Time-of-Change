import Building from "../Building";
import PositionInterface from "../../interfaces/PositionInterface";

export default class Woodcutters extends Building {
    constructor(position: PositionInterface, id: string, playerId: number) {
        super(id, position, 'woodcutters', playerId);
    }
}
