"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BABYLON = require("babylonjs");
const Terrain_1 = require("./Terrain");
let instance = null;
class Game {
    static getInstance() {
        if (null === instance) {
            instance = new Game();
        }
        return instance;
    }
    createScene(canvas, engine) {
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
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
        var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 10, 0), scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        this._terrain = new Terrain_1.default(this);
    }
    initialize(canvas) {
        const engine = new BABYLON.Engine(canvas, true);
        this.createScene(canvas, engine);
        engine.runRenderLoop(() => {
            this._scene.render();
        });
        window.addEventListener('resize', function () {
            engine.resize();
        });
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
}
exports.Game = Game;
const game = Game.getInstance();
exports.default = game;
//# sourceMappingURL=Game.js.map