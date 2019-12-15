"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BABYLON = require("babylonjs");
const Terrain_1 = require("./Terrain");
const AssetsManager_1 = require("./AssetsManager");
const Game_1 = require("./Game");
const Camera_1 = require("./Camera");
const MapUpdateCommand_1 = require("./Commands/MapUpdateCommand");
const BuildingUpdateCommand_1 = require("./Commands/BuildingUpdateCommand");
const CharacterUpdateCommand_1 = require("./Commands/CharacterUpdateCommand");
const PanelUpdateCommand_1 = require("./Commands/PanelUpdateCommand");
const config_1 = require("./configuration/config");
const GameUpdateCommand_1 = require("./Commands/GameUpdateCommand");
class GameScene {
    constructor() {
        this._trees = {};
        this._stones = {};
        this._fields = {};
    }
    createScene() {
        const canvas = document.getElementById('render-canvas');
        const engine = new BABYLON.Engine(canvas, true);
        window.addEventListener('resize', function () {
            engine.resize();
        });
        this._canvas = canvas;
        this._engine = engine;
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new BABYLON.Scene(engine);
        this._scene = scene;
        // @ts-ignore
        window.scene = scene;
        this._engine.enableOfflineSupport = false;
        // This creates and positions a free camera (non-mesh)
        this._camera = new Camera_1.default(this._scene, this._canvas);
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
        if (config_1.default.get('app').debug) {
            scene.debugLayer.show();
        }
    }
    /**
     * This method is called by the assetsManager after all assets has been loaded.
     */
    onAssetsLoaded() {
        this._terrain = new Terrain_1.default();
        new MapUpdateCommand_1.default();
        new BuildingUpdateCommand_1.default();
        new CharacterUpdateCommand_1.default();
        new PanelUpdateCommand_1.default();
        new GameUpdateCommand_1.default();
        Game_1.default.gameScene.engine.runRenderLoop(() => {
            this._scene.render();
            this._camera.update();
        });
    }
    updateCoordinate(data) {
        /**
         * Fixme: Replace this function with a global library.
         * @param number
         * @param width
         */
        function pad(number, width) {
            number = number + '';
            return number.length >= width ? number : new Array(width - number.length + 1).join('0') + number;
        }
        let instanceName = '';
        if (true === data.hasTree) {
            instanceName = 'tree' + pad(data.x, 2) + pad(data.z, 2);
            const tree = AssetsManager_1.default.getTreeMeshByName('tree', instanceName);
            tree.position.x = data.x + Math.random();
            tree.position.y = this._terrain.getHeight(data.x, data.z);
            tree.position.z = data.z + Math.random();
            this._trees[instanceName] = tree;
            //this._shadowGenerator.getShadowMap().renderList.push(tree);
        }
        else if (true === data.hasField) {
            instanceName = 'field' + pad(data.x, 2) + pad(data.z, 2);
            const acre = AssetsManager_1.default.getFieldMeshByName('acre', instanceName);
            acre.position.x = data.x + 0.5;
            acre.position.y = this._terrain.getHeight(data.x, data.z);
            acre.position.z = data.z + 0.5;
            acre.metadata = {
                isField: true,
                position: {
                    x: data.x,
                    z: data.z,
                },
            };
            this._fields[instanceName] = acre;
            if (false === data.hasTree) {
                this.removeTree('tree' + pad(data.x, 2) + pad(data.z, 2));
            }
        }
        else if (true === data.hasStone) {
            instanceName = 'stone' + pad(data.x, 2) + pad(data.z, 2);
            const stone = AssetsManager_1.default.getStoneMeshByName('stone', instanceName);
            stone.position.x = data.x + 0.5;
            stone.position.y = this._terrain.getHeight(data.x, data.z) + 0.5;
            stone.position.z = data.z + 0.5;
            this._stones[instanceName] = stone;
        }
        else {
            this.removeTree('tree' + pad(data.x, 2) + pad(data.z, 2));
        }
    }
    /**
     * FIXME: Remove tree on runtime.
     * @param instanceName
     */
    removeTree(instanceName) {
        if (this._trees[instanceName]) {
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
    get camera() {
        return this._camera;
    }
}
exports.default = GameScene;
//# sourceMappingURL=GameScene.js.map