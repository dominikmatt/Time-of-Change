import * as BABYLON from 'babylonjs';
import Terrain from "./Terrain";
import connectionService from "./services/connection";

export default class GameScene {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _terrain: Terrain;

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

        this._terrain = new Terrain();
    }

    public updateCoordinate(data: any) {
        if ('true' === data.hasTree) {
            BABYLON.SceneLoader.ImportMeshAsync(
                null,
                'assets/models/terrain/',
                'tree001.babylon',
                this._scene)
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
}
