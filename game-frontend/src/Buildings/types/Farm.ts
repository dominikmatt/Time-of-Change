import Building from "../Building";
import PositionInterface from "../../interfaces/PositionInterface";

export default class Farm extends Building {
    constructor(position: PositionInterface, id: string, playerId: number) {
        super(id, position, 'farm', playerId);
    }
}
