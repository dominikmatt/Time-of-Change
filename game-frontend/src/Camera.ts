import * as BABYLON from 'babylonjs';

export default class Camera {
    private moveState = {
        forward: false,
        left: false,
        backward: false,
        right: false,
    };
    private _camera: BABYLON.FreeCamera;
    private _changeRotation: boolean = false;
    private _canvas: HTMLCanvasElement;

    public constructor(scene: BABYLON.Scene, canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        // This targets the camera to scene origin
        this._camera.setTarget(BABYLON.Vector3.Zero());

        //Set the ellipsoid around the camera (e.g. your player's size)
        this._camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

        this.bindDOMEvents();
    }

    private bindDOMEvents() {
        document.addEventListener('keydown', this.onKeyPressHandler.bind(this));
        document.addEventListener('keyup', this.onKeyUpHandler.bind(this));
        document.addEventListener('mousewheel', this.onMousewheelHandler.bind(this));
        this._canvas.addEventListener('mousemove', this.onMousemoveHandler.bind(this));
    }

    /**
     * Rotates the camera when mouse is moving and the Crontol-Key is pressed.
     */
    private onMousemoveHandler(event: MouseEvent) {
        if (false === this._changeRotation) {
            return;
        }

        this._camera.rotation.y += event.movementX / 60;
        this._camera.rotation.x += event.movementY / 60;

        if (1.5 < this._camera.rotation.x) {
            this._camera.rotation.x = 1.5;
        } else if (0.25 > this._camera.rotation.x) {
            this._camera.rotation.x = 0.25;
        }
    }

    /**
     * Enable rotation control when Control-Key has been pressed.
     */
    private onKeyPressHandler(event: KeyboardEvent) {
        if ('Control' === event.key) {
            this._changeRotation = true;
        }

        this.setMoveState(event.key, true);
    }

    /**
     * Disable rotation control when Control-Key has been pressed.
     */
    private onKeyUpHandler(event: KeyboardEvent) {
        if ('Control' === event.key) {
            this._changeRotation = false;
        }

        this.setMoveState(event.key, false);
    }

    private onMousewheelHandler(event: WheelEvent) {
        this.zoomCamera(event.deltaY);
    }

    /**
     * Zoom in or out when mousewheel has been wheeled.
     */
    private zoomCamera(wheelDelta: number) {
        this._camera.position.y += wheelDelta/100;

        if (2.5 > this._camera.position.y) {
            this._camera.position.y = 2.5;
        } else if (20 < this._camera.position.y) {
            this._camera.position.y = 20;
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
        let movement: BABYLON.Vector3;
        let x: number = 0;
        let z: number = 0;

        if (!this.moveState.backward && !this.moveState.forward && !this.moveState.left && !this.moveState.right) {
            return;
        }

        if (this.moveState.right) {
            x = 0.4
        } else if (this.moveState.left) {
            x = -0.4
        }

        if (this.moveState.forward) {
            z = 0.4;
        } else if (this.moveState.backward) {
            z = -0.4;
        }

        movement = BABYLON.Vector3.TransformCoordinates(
            new BABYLON.Vector3(x, 0, z),
            BABYLON.Matrix.RotationY(this._camera.rotation.y)
        );

        this._camera.position.addInPlace(movement);
    }
}
