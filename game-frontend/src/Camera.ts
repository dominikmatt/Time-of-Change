import * as BABYLON from 'babylonjs';

export default class Camera {
    private moveState = {
        forward: false,
        left: false,
        backward: false,
        right: false,
    };
    private _camera: BABYLON.ArcRotateCamera;
    private _canvas: HTMLCanvasElement;

    public constructor(scene: BABYLON.Scene, canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        // TODO: Use ArcRotateCamera.
        this._camera = new BABYLON.ArcRotateCamera(
            "camera1",
            -Math.PI / 2,
            Math.PI / 2,
            8,
            new BABYLON.Vector3(0, 5, -10),
            scene
        );

        this._camera.attachControl(this._canvas, false, false);
        this._camera.inputs.removeByType('ArcRotateCameraKeyboardMoveInput');
        this._camera.inputs.addMouseWheel();
        this._camera.inputs.addPointers();
        this._camera.lowerRadiusLimit = 10;
        this._camera.upperRadiusLimit = 20;
        this._camera.upperBetaLimit = 1.42;


        // This targets the camera to scene origin
        this._camera.setTarget(BABYLON.Vector3.Zero());

        //Set the ellipsoid around the camera (e.g. your player's size)
        // @ts-ignore
        this._camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

        this.bindDOMEvents();
    }

    private bindDOMEvents() {
        document.addEventListener('keydown', this.onKeyPressHandler.bind(this));
        document.addEventListener('keyup', this.onKeyUpHandler.bind(this));
        document.addEventListener('mousewheel', this.onMousewheelHandler.bind(this));
    }

    /**
     * Move direction start.
     */
    private onKeyPressHandler(event: KeyboardEvent) {
        this.setMoveState(event.key, true);
    }

    /**
     * Move Direction end.
     */
    private onKeyUpHandler(event: KeyboardEvent) {
        this.setMoveState(event.key, false);
    }

    private onMousewheelHandler(event: WheelEvent) {
        this.zoomCamera(event.deltaY);
    }

    /**
     * Zoom in or out when mousewheel has been wheeled.
     */
    private zoomCamera(wheelDelta: number) {
        this._camera.position.x += wheelDelta/100;

        if (2.5 > this._camera.position.y) {
            this._camera.position.x = 2.5;
        } else if (20 < this._camera.position.y) {
            this._camera.position.x = 20;
        }
    }

    private setMoveState(key: string, isMoving: boolean) {
        switch(key) {
            case 'w':
                this.moveState.forward = isMoving;
            break;
            case 'a':
                this.moveState.left = isMoving;
            break;
            case 's':
                this.moveState.backward = isMoving;
            break;
            case 'd':
                this.moveState.right = isMoving;
            break;
        }
    }

    /**
     * Update camera.
     */
    update() {
        let position: BABYLON.Vector3;
        let target: BABYLON.Vector3;
        let delta: BABYLON.Vector3;
        let x: number = 0;
        let z: number = 0;

        if (!this.moveState.backward && !this.moveState.forward && !this.moveState.left && !this.moveState.right) {
            return;
        }

        if (this.moveState.right) {
            z = 0.4;
        } else if (this.moveState.left) {
            z = -0.4;
        }

        if (this.moveState.forward) {
            x = 0.4;
        } else if (this.moveState.backward) {
            x = -0.4;
        }

        delta = BABYLON.Vector3.TransformCoordinates(
            new BABYLON.Vector3(x, this._camera.position.y, z),
            BABYLON.Matrix.RotationY(this._camera.alpha)
        );

        target = new BABYLON.Vector3(
            this._camera.target.x - delta.x,
            this._camera.target.y,
            this._camera.target.z + delta.z
        );

        position = new BABYLON.Vector3(
            this._camera.position.x - delta.x,
            this._camera.position.y,
            this._camera.position.z + delta.z
        );

        this._camera.setTarget(target);
        this._camera.setPosition(position);
    }
}
