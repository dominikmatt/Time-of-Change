"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BABYLON = require("babylonjs");
const Terrain_1 = require("./Terrain");
class GameScene {
    constructor() {
        this._trees = {};
    }
    createScene() {
        const canvas = document.getElementById('render-canvas');
        const engine = new BABYLON.Engine(canvas, true);
        this._trees = {};
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
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
        const light = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(0, 0, 0);
        light.groundColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        var sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(100, 100, 40), scene);
        sun.diffuse = new BABYLON.Color3(1, 1, 1);
        sun.specular = new BABYLON.Color3(0, 0, 0);
        this._shadowGenerator = new BABYLON.ShadowGenerator(1024, sun);
        this._shadowGenerator.useBlurExponentialShadowMap = true;
        this._shadowGenerator.useKernelBlur = true;
        this._shadowGenerator.blurKernel = 64;
        BABYLON.SceneLoader.ImportMeshAsync(null, 'assets/models/terrain/', 'tree001.babylon', this._scene)
            .then((result) => {
            this.tree = result.meshes[0];
            this.tree.scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
            this.tree.position = BABYLON.Vector3.Zero();
            this._terrain = new Terrain_1.default();
        });
    }
    updateCoordinate(data) {
        function pad(n, width) {
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
        }
        const instanceName = 'tree' + pad(data.x, 2) + pad(data.z, 2);
        if ('true' === data.hasTree) {
            const tree = this.tree.createInstance(instanceName);
            tree.position.x = data.x + 0.5;
            tree.position.y = this._terrain.getHeight(data.x, data.z);
            tree.position.z = data.z + 0.5;
            this._trees[instanceName] = tree;
            //this._shadowGenerator.getShadowMap().renderList.push(tree);
        }
        else if (this._trees[instanceName]) {
            this._trees[instanceName].dispose();
            this._trees[instanceName] = null;
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
    get shadowGenerator() {
        return this._shadowGenerator;
    }
}
exports.default = GameScene;
//# sourceMappingURL=GameScene.js.map