import {default as game} from "../Game";
import PositionInterface, {WalkPositionInterface} from "../interfaces/PositionInterface";
import assetsManager from "../AssetsManager";
import Vector3 = BABYLON.Vector3;
import IAnimationKey = BABYLON.IAnimationKey;

export default class Character {
    private _position: PositionInterface;
    private _walkingPath: WalkPositionInterface[] = [];
    protected _mesh: BABYLON.AbstractMesh;
    protected _id: string;
    private _isWalking: boolean = false;
    private _walkAnimation: BABYLON.Animatable;
    private _walkingDebugPath: BABYLON.LinesMesh;

    constructor(id: string, position: PositionInterface) {
        this._position = position;
        this._id = id;

        this.load();

        let lastPosition: PositionInterface = position;
        game.gameScene.scene.registerBeforeRender(() => {
            if (!this._walkAnimation || !this._mesh) {
                return;
            }

            const currentPosition: PositionInterface = this._mesh.position;

            if (currentPosition.x < lastPosition.x) {
                this._mesh.rotation.y =  Math.PI/2 * 2;
            } else if (currentPosition.x > lastPosition.x) {
                this._mesh.rotation.y =  Math.PI/2 * 4;
            } else if (currentPosition.z > lastPosition.z) {
                this._mesh.rotation.y =  Math.PI/2 * 3;
            } else {
                this._mesh.rotation.y =  Math.PI/2 * 1;
            }


            lastPosition = this._mesh.position;
        });
    }

    set position(position: PositionInterface) {
        this._position = position;

        //this.setPosition();
    }

    /**
     * Load character and place it to the scene.
     */
    private load() {
        this._mesh = assetsManager.getCharacterMeshByName('character', this._id);
        this._mesh.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
        this.setPosition();

        game.gameScene.shadowGenerator.getShadowMap().renderList.push(this._mesh);

        // Show meshes.
        this._mesh.isVisible = true;
    }

    private setPosition() {
        if (!this._mesh) {
            return;
        }

        this._mesh.position = BABYLON.Vector3.Zero();
        this._mesh.position.x = this._position.x;
        this._mesh.position.y = game.gameScene.terrain.getHeight(this._position.x, this._position.z, true);
        this._mesh.position.z = this._position.z;


        this._mesh.rotation.y = Math.PI/2 * 3;
    }

    public setHealt(currentHealth: number, maxHealth: number) {
        if (!this._mesh) {
            return;
        }

        if (maxHealth === 0 ) {
            maxHealth = 1;
        }

        this._mesh.position.y = currentHealth/maxHealth - 1;
    }

    private startWalking() {
        //Create a scaling animaation at 30 FPS
        var animationBox = new BABYLON.Animation(
            `walkAnimation${this._id}`,
            "position",
            30,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT        );
        // Animation keys
        const keys: Array<IAnimationKey> = [];
        let frame = 0;
        const debugPath: BABYLON.Vector3[] = [];

        this._walkingPath.forEach((point: WalkPositionInterface, index: number) => {
            frame = index * 30;
            const vector: BABYLON.Vector3 = new Vector3(
                point.x + 0.5,
                game.gameScene.terrain.getHeight(point.x, point.z, true),
                point.z + 0.5
            );

            debugPath.push(vector);

            keys.push({
                frame: frame,
                value: vector,
            });
        });

        var catmullRom = BABYLON.Curve3.CreateCatmullRomSpline(debugPath, 30);

        this._walkingDebugPath = BABYLON.Mesh.CreateLines("catmullRom", catmullRom.getPoints(), game.gameScene.scene);


        if (1 === keys.length) {
            return;
        }

        animationBox.setKeys(keys);

        this._mesh.animations.push(animationBox);

        setTimeout(async () => {
            this._walkAnimation = game.gameScene.scene.beginAnimation(this._mesh, 0, frame, false);

            this._walkAnimation.onAnimationEnd = ( => {
                this._walkingDebugPath.dispose();
            };
        });
    }

    set walkingPath(path: WalkPositionInterface[]) {
        if (false === this._isWalking && 0 < path.length) {
            console.log('start');
            this._walkingPath = path;

            this.startWalking();
        }

        this._walkingPath = path;
    }

    set isWalking(value: boolean) {
        this._isWalking = value;
    }
}
