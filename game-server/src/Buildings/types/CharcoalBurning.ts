import EconomyBuilding from "../EconomyBuilding";
import BuildingInterface from "../BuildingInterface";
import CostComponent from "../../Components/CostComponent";
import {PositionInterface} from "../../Components/PositionComponent";
import Player from "../../Player";

export default class CharcoalBurning extends EconomyBuilding implements BuildingInterface {
    readonly _matrix: number[][] = [
        [1,1,1,1],
        [1,1,1,1],
        [1,2,1,1],
    ];

    constructor(player: Player, position: PositionInterface, alreadyBuilt: boolean = false) {
        super(player, position);

        this._cost = new CostComponent({
            timber: 3,
            stones: 4,
        });

        this.build(alreadyBuilt);
    }

    protected getBuildingData() {
        return {};
    }
}