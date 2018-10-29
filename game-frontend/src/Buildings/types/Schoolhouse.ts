import Building from "../Building";
import PositionInterface from "../../interfaces/PositionInterface";

export default class Schoolhouse extends Building {
    constructor(position: PositionInterface, id: string, playerId: number) {
        super(id, position, 'schoolhouse', playerId);
    }
}
