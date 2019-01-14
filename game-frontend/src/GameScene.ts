import * as BABYLON from 'babylonjs';
import Terrain from "./Terrain";
import assetsManager from "./AssetsManager";
import game from "./Game";
import Camera from "./Camera";
import { Inspector } from "babylonjs-inspector";
import MapUpdateCommand from "./Commands/MapUpdateCommand";
import BuildingUpdateCommand from "./Commands/BuildingUpdateCommand";
import CharacterUpdateCommand from "./Commands/CharacterUpdateCommand";
import PanelUpdateCommand from "./Commands/PanelUpdateCommand";

interface TreesInterface {
    [propName: string]: BABYLON.InstancedMesh;
}

export default class GameScene {
    private _trees: TreesInterface = {};
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _terrain: Terrain;
    private _shadowGenerator: BABYLON.ShadowGenerator;
    private _camera: Camera;

    public constructor() {

    }

    public createScene() {
        const canvas: HTMLCanvasElement = document.getElementById('render-canvas') as HTMLCanvasElement;
        const engine: BABYLON.Engine = new BABYLON.Engine(canvas, true);

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
        this._camera = new Camera(this._scene, this._canvas);

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


        new Inspector(this._scene, false, 0, null);
    }

    /**
     * This method is called by the assetsManager after all assets has been loaded.
     */
    public onAssetsLoaded() {
        this._terrain = new Terrain();

        new MapUpdateCommand();
        new BuildingUpdateCommand();
        new CharacterUpdateCommand();
        new PanelUpdateCommand();

        game.gameScene.engine.runRenderLoop(() => {
            this._scene.render();
            this._camera.update();
        });
    }

    public updateCoordinate(data: any) {
        /**
         * Fixme: Replace this function with a global library.
         * @param number
         * @param width
         */
        function pad(number: string, width: number) {
            number = number + '';
            return number.length >= width ? number : new Array(width - number.length + 1).join('0') + number;
        }

        const instanceName: string = 'tree' + pad(data.x, 2) + pad(data.z, 2);

        if ('true' === data.hasTree) {
            const tree = assetsManager.getTreeMeshByName('tree', instanceName);

            tree.position.x = data.x + Math.random();
            tree.position.y = this._terrain.getHeight(data.x, data.z);
            tree.position.z = data.z + Math.random();

            this._trees[instanceName] = tree;

            //this._shadowGenerator.getShadowMap().renderList.push(tree);
        } else if(this._trees[instanceName]) {
            this._trees[instanceName].dispose();

            this._trees[instanceName] = null
        }
    }

    get scene(): BABYLON.Scene {
        return this._scene;
    }

    get engine(): BABYLON.Engine {
        return this._engine;
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    get terrain(): Terrain {
        return this._terrain;
    }

    get shadowGenerator(): any {
        return this._shadowGenerator;
    }

    get camera(): Camera {
        return this._camera;
    }
}
