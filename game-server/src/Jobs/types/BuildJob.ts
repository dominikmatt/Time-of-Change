import Job from "../Job";
import JobInterface from "../JobInterface";
import Player from "../../Player";
import {PositionInterface} from "../../Components/PositionComponent";
import Character from "../../Characters/Character";
import Map from "../../Map/Map";
import Storehouse from "../../Buildings/types/Storehouse";
import Building from "../../Buildings/Building";

export default class BuildJob extends Job implements JobInterface {
    protected readonly _type: string = 'transport';
    private readonly _targetBuilding: Building;
    private readonly _character?: Character = null;

    constructor(
        player: Player,
        targetBuilding?: Building,
        character?: Character
    ) {
        super(player);

        this._targetBuilding = targetBuilding;
        this._character = character;
    }


    public toJSON(): string {
        return JSON.stringify({
            _id: this._id,
            type: this.getType(),
            player: this._player.token,
            targetBuilding: this._targetBuilding.id
        });
    }

    public update(): void {


    }
}
