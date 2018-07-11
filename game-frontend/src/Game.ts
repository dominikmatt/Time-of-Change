import * as BABYLON from 'babylonjs';
import Terrain from "./Terrain";

let instance: Game = null;

export class Game {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _terrain: Terrain;

    public static getInstance(): Game {
        if (null === instance) {
            instance = new Game();
        }

        return instance;
    }

    createScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
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

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 10, 0), scene);
        light.diffuse = new BABYLON.Color3(1, 1, 1);

        this._terrain = new Terrain(this);
    }

    initialize(canvas: HTMLCanvasElement) {
        const engine = new BABYLON.Engine(canvas, true);
        this.createScene(canvas, engine);

        engine.runRenderLoop(() => {
            this._scene.render();
        });

        window.addEventListener('resize', function () {
            engine.resize();
        });
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
}

const game: Game = Game.getInstance();

export default game;
