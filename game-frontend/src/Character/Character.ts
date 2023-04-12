import * as BABYLON from 'babylonjs'
import {default as game} from "../Game";
import PositionInterface, {WalkPositionInterface} from "../interfaces/PositionInterface";
import assetsManager from "../AssetsManager";
import Vector3 = BABYLON.Vector3;
import IAnimationKey = BABYLON.IAnimationKey;
import {GAME_SPEED} from "../constants";

export default class Character {
    private _position: PositionInterface;
    private _walkingPath: WalkPositionInterface[] = [];
    protected _mesh: BABYLON.AbstractMesh;
    protected _id: string;
    private _isWalking: boolean = false;
    private _walkAnimation: BABYLON.Animatable;
    private _walkingDebugPath: BABYLON.LinesMesh;
    private _nextPosition: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 0);
    private _nextPositionDebugSphere: BABYLON.Mesh;
    private _skeleton: BABYLON.Skeleton;

    constructor(id: string, position: PositionInterface) {
        this._position = position;
        this._id = id;

        this._nextPositionDebugSphere = BABYLON.Mesh.CreateSphere("sphere", 0.5, 0.5, game.gameScene.scene);
        this._nextPositionDebugSphere.material = new BABYLON.StandardMaterial("sphereMat", game.gameScene.scene);
        this.load();
    }

    set position(position: PositionInterface) {
        this._position = position;
    }

    /**
     * Load character and place it to the scene.
     */
    private load() {
        this._mesh = assetsManager.getCharacterMeshByName('character', this._id);
        this._mesh.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);

        this._mesh.checkCollisions = true;
        this._mesh.isPickable = true;
        this._mesh.metadata = {
            isCharacter: true,
            characterId: this._id,
        };


        this.setPosition();
        this.findSkeleton();


        this.addAnimation('idle', 0, 320);
        this.addAnimation('walk', 323, 364);
        this.addAnimation('dance', 367, 738);
        this.playAnimation('idle', true);

        game.gameScene.shadowGenerator.getShadowMap().renderList.push(this._mesh);

        game.gameScene.scene.registerBeforeRender(() => {
            this._nextPositionDebugSphere.position = this._nextPosition;
            this.lookAt(this._nextPosition);
        });

        // Show meshes.
        this._mesh.isVisible = true;
    }

    /**
     * Attach the given mesh to this controller, and found the character skeleton.
     * The skeleton used for the mesh animation (and the debug viewer) is the first found one.
     */
    public findSkeleton() {
        // Stop mesh animations
        this._mesh.getScene().stopAnimation(this._mesh);

        // Find skeleton if possible
        if (this._mesh.skeleton) {
            this._skeleton = this._mesh.skeleton;
            // Stop skeleton animations
            this._mesh.getScene().stopAnimation(this._skeleton);
            // Activate animation blending
            this._skeleton.enableBlending(0.08);
        }

        this._skeleton.beginAnimation('idle', true, GAME_SPEED);
    }

    /**
     * Play the given animation if skeleton found
     */
    public playAnimation(name:string, loop:boolean, speed:number = 1) {
        if (this._skeleton){
            this._skeleton.beginAnimation(name, loop, speed * GAME_SPEED);
        }
    }

    /**
     * @deprecated
     */
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
            `walkAnimationPod${this._id}`,
            "position",
            30,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        // Animation keys
        const keys: Array<IAnimationKey> = [];
        let frame = 0;
        const path: BABYLON.Vector3[] = [];

        //
        this._walkingPath.forEach((point: WalkPositionInterface, index: number) => {
            frame = index * 30;
            const vector: BABYLON.Vector3 = new Vector3(
                point.x + 0.5,
                game.gameScene.terrain.getHeight(point.x, point.z, true),
                point.z + 0.5
            );

            path.push(vector);
        });

        console.log(path)
        let catmullRom = BABYLON.Curve3.CreateCatmullRomSpline(path, 30);

        catmullRom.getPoints().forEach((point: BABYLON.Vector3, frame: number) => {
            // Add walking point to walk animation.
            keys.push({
                frame: frame,
                value: point
            });


            // https://github.com/Temechon/ms-experiences16/tree/master/ts
        });

        // Print debug walking path.
        this._walkingDebugPath = BABYLON.Mesh.CreateLines(
            `walkAnimationDebugPath${this._id}`,
            catmullRom.getPoints(),
            game.gameScene.scene,
          true
        );


        if (1 === keys.length) {
            return;
        }

        animationBox.setKeys(keys);

        this._mesh.animations.push(animationBox);

        // Begin animation.
        setTimeout(async () => {
            this._walkAnimation = game.gameScene.scene.beginAnimation(this._mesh, 0, frame, false, GAME_SPEED - 1);
            this.playAnimation('walk', true);

            this._walkAnimation.onAnimationEnd = () => {
                // Remove debug path after animation has been completed.
                this._walkingDebugPath.dispose();
                this.playAnimation('idle', true);
            };
        });
    }

    /**
     * The character looks at the given position, but rotates only along Y-axis
     * */
    private lookAt(value:BABYLON.Vector3){
        var dv = value.subtract(this._mesh.position);
        var yaw = -Math.atan2(dv.z, dv.x) - Math.PI / 2;
        this._mesh.rotation.y = yaw ;
    }

    /**
     * Add an animation to this character
     */
    public addAnimation(name:string, from:number, to:number) {
        if (this._skeleton) {
            this._skeleton.createAnimationRange(name, from, to);
        }
    }

    public kill() {
        this._mesh.dispose();
    }

    set walkingPath(path: WalkPositionInterface[]) {
        if (false === this._isWalking && 0 < path.length) {
            this._walkingPath = path;

            this.startWalking();
        }

        this._walkingPath = path;
    }

    set isWalking(value: boolean) {
        this._isWalking = value;
    }

    set nextPosition(position: BABYLON.Vector3) {
        this._nextPosition = position;
    }
}
