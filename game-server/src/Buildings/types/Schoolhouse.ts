import EconomyBuilding from "../EconomyBuilding";
import BuildingInterface from "../BuildingInterface";
import CostComponent from "../../Components/CostComponent";
import {PositionInterface} from "../../Components/PositionComponent";
import Player from "../../Player";

/**
 * The storehouse will store all Resources from the player.
 */
export default class Schoolhouse extends EconomyBuilding implements BuildingInterface {
    private readonly _maxGoldStore: number = 5;

    readonly _matrix: number[][] = [
        [1,1,1],
        [1,2,1]
    ];

    private _currentGoldStore: number = 0;

    constructor(player: Player, position: PositionInterface, alreadyBuilt: boolean = false) {
        super(player, position);

        this._cost = new CostComponent({
            timber: 6,
            stones: 5
        });

        this.build(alreadyBuilt);
    }

    protected getType() {
        return 'schoolhouse';
    }

    protected getBuildingData() {
        return {
            maxGoldStore: this._maxGoldStore,
            currentGoldStore: this._currentGoldStore
        };
    }

    get currentGoldStore(): number {
        return this._currentGoldStore;
    }

    set currentGoldStore(value: number) {
        this._currentGoldStore = value;
    }
}