import Building from "../Building";
import PositionInterface from "../../interfaces/PositionInterface";

export default class ArmourSmithy extends Building {
    constructor(position: PositionInterface, id: string, playerId: number) {
        super(id, position, 'bakery', playerId);
    }
}
