import Building from "./Building";
import {PositionInterface} from "../Components/PositionComponent";
import Player from "../Player";

/**
 * Economy Buildings are buildings to store and produce date for the economy.
 */
export default abstract class EconomyBuilding extends Building {
    constructor(player: Player, position: PositionInterface) {
        super(player, position);
    }
}
