import {PositionInterface} from "../Components/PositionComponent";

export const getDistanceFromPoints = (positionA: PositionInterface, positionB: PositionInterface) => {
    const x = positionA.x - positionB.x;
    const z = positionA.z - positionB.z;

    return Math.sqrt( x*x + z*z );
};