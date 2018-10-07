"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BABYLON = require("babylonjs");
const Terrain_1 = require("./Terrain");
class GameScene {
    constructor() {
    }
    createScene() {
        const canvas = document.getElementById('render-canvas');
        const engine = new BABYLON.Engine(canvas, true);
        engine.runRenderLoop(() => {
            this._scene.render();
        });
        window.addEventListener('resize', function () {
            engine.resize();
        });
        this._canvas = canvas;
        this._engine = engine;
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new BABYLON.Scene(engine);
        this._scene = scene;
        this._engine.enableOfflineSupport = false;
        // This creates and positions a free camera (non-mesh)
        const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        //Set the ellipsoid around the camera (e.g. your player's size)
        camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        BABYLON.MeshBuilder.CreateBox("myBox", { height: 5, width: 0.5, depth: 0.5 }, scene);
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
        var light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
        //var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 10, 0), scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        this._terrain = new Terrain_1.default();
    }
    updateCoordinate(data) {
        if ('true' === data.hasTree) {
            BABYLON.SceneLoader.ImportMeshAsync(null, 'assets/terrain/', 'tree001.babylon', this._scene)
                .then((result) => {
                const mesh = result.meshes[0];
                mesh.scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
                mesh.position = BABYLON.Vector3.Zero();
                mesh.position.x = data.x + 0.5;
                mesh.position.y = this._terrain.getHeight(data.x, data.z);
                mesh.position.z = data.z + 0.5;
            });
        }
    }
    get scene() {
        return this._scene;
    }
    get engine() {
        return this._engine;
    }
    get canvas() {
        return this._canvas;
    }
    get terrain() {
        return this._terrain;
    }
}
exports.default = GameScene;
//# sourceMappingURL=GameScene.js.map