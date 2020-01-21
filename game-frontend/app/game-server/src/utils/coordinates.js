"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistanceFromPoints = (positionA, positionB) => {
    const x = positionA.x - positionB.x;
    const z = positionA.z - positionB.z;
    return Math.sqrt(x * x + z * z);
};
//# sourceMappingURL=coordinates.js.map