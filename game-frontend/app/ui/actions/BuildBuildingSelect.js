"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../../Game");
const connection_1 = require("../../services/connection");
class BuildBuildingSelect {
    constructor(element) {
        const box = BABYLON.Mesh.CreateBox("box", 2, Game_1.default.gameScene.scene);
        this.pickResult = null;
        window.addEventListener("mousemove", (event) => {
            // We try to pick an object
            var pickResult = Game_1.default.gameScene.scene.pick(Game_1.default.gameScene.scene.pointerX, Game_1.default.gameScene.scene.pointerY);
            if (pickResult) {
                console.log(pickResult);
                this.pickResult = pickResult;
                box.position.x = pickResult.pickedPoint.x;
                box.position.y = 0;
                box.position.z = pickResult.pickedPoint.z;
            }
        });
        window.addEventListener('click', () => {
            if (!this.pickResult) {
                return;
            }
            connection_1.default.socket.emit('building.create', {
                type: 'schoolhouse',
                position: {
                    x: this.pickResult.pickedPoint.x,
                    y: 0,
                    z: this.pickResult.pickedPoint.z
                }
            });
        });
    }
}
exports.default = BuildBuildingSelect;
//# sourceMappingURL=BuildBuildingSelect.js.map