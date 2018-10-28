import {PositionInterface} from "../Components/PositionComponent";

export default interface ProductionBuildingInterface {
    id: string;
    doorPosition: PositionInterface;
    decreaseStore(): boolean;
}