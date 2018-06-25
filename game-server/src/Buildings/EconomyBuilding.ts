import Building from "./Building";
import {PositionInterface} from "../Components/PositionComponent";

/**
 * Economy Buildings are buildings to store and produce date for the economy.
 */
export default abstract class EconomyBuilding extends Building {
    constructor(position: PositionInterface) {
        super(position);
    }
}
