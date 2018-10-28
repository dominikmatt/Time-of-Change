import * as BABYLON from 'babylonjs';
import Terrain from "./Terrain";

interface TreesInterface {
    [propName: string]: BABYLON.InstancedMesh;
}

export default class GameScene {
    private tree: BABYLON.Mesh;
    private _trees: TreesInterface = {};
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _terrain: Terrain;
    private _shadowGenerator: BABYLON.ShadowGenerator;

    public constructor() {

    }

    public createScene() {
        const canvas: HTMLCanvasElement = document.getElementById('render-canvas') as HTMLCanvasElement;
        const engine: BABYLON.Engine = new BABYLON.Engine(canvas, true);

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
        const camera: BABYLON.FreeCamera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
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

        BABYLON.SceneLoader.ImportMeshAsync(
            null,
            'assets/models/terrain/',
            'tree001.babylon',
            this._scene)
            .then((result) => {
                this.tree = (<BABYLON.Mesh>result.meshes[0]);

                this.tree.scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
                this.tree.position = BABYLON.Vector3.Zero();

                this._terrain = new Terrain();
            });

    }

    public updateCoordinate(data: any) {
        /**
         * Fixme: Replace this function with a global library.
         * @param n
         * @param width
         */
        function pad(number: string, width: number) {
            number = number + '';
            return number.length >= width ? number : new Array(width - number.length + 1).join('0') + number;
        }

        const instanceName: string = 'tree' + pad(data.x, 2) + pad(data.z, 2);

        if ('true' === data.hasTree) {
            const tree = this.tree.createInstance(instanceName);

            tree.position.x = data.x + 0.5;
            tree.position.y = this._terrain.getHeight(data.x, data.z);
            tree.position.z = data.z + 0.5;

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
}
