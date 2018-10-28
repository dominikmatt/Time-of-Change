import Building from "../Building";
import PositionInterface from "../../interfaces/PositionInterface";

export default class Storehouse extends Building {
    static asset: string = 'storehouse.babylon';

    constructor(position: PositionInterface, id: string, playerId: number) {
        super(id, position, 'storehouse', playerId);
    }
}
