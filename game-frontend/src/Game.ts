import * as BABYLON from 'babylonjs';
import Terrain from "./Terrain";

let instance: Game = null;

class Game {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _terrain: Terrain;

    public static getInstance() {
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

        // This creates and positions a free camera (non-mesh)
        const camera: BABYLON.FreeCamera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light: BABYLON.Light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

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

export default Game.getInstance();
