import Building from "../Building";
import PositionInterface from "../../interfaces/PositionInterface";

export default class Sawmill extends Building {
    constructor(position: PositionInterface, id: string, playerId: number) {
        super(id, position, 'sawmill', playerId);
    }
}
