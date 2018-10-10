import game from "../../Game";
import connectionService from "../../services/connection";

export default class BuildBuildingSelect {
    private pickResult: any;

    constructor(element: HTMLElement) {
        const box = BABYLON.Mesh.CreateBox("box", 2, game.gameScene.scene);
        this.pickResult = null;

        window.addEventListener("mousemove", (event) => {
            // We try to pick an object
            var pickResult = game.gameScene.scene.pick(game.gameScene.scene.pointerX, game.gameScene.scene.pointerY);

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
            connectionService.socket.emit('building.create', {
                type: 'schoolhouse',
                position: {
                    x: this.pickResult.pickedPoint.x,
                    y: 0,
                    z: this.pickResult.pickedPoint.z
                }
            });
        })
    }
}
