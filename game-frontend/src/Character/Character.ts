import {default as game} from "../Game";
import PositionInterface, {WalkPositionInterface} from "../interfaces/PositionInterface";
import assetsManager from "../AssetsManager";
import Vector3 = BABYLON.Vector3;
import IAnimationKey = BABYLON.IAnimationKey;
import LinesMesh = BABYLON.LinesMesh;

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
        this.setPosition();

        game.gameScene.shadowGenerator.getShadowMap().renderList.push(this._mesh);

        // Show meshes.
        this._mesh.isVisible = true;
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
        const animationRotation = new BABYLON.Animation(
            `walkAnimationPod${this._id}`,
            'rotation',
            30,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        // Animation keys
        const keys: Array<IAnimationKey> = [];
        const keysRotation: Array<IAnimationKey> = [];
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

        let catmullRom = BABYLON.Curve3.CreateCatmullRomSpline(path, 30);

        const path3d: BABYLON.Path3D = new BABYLON.Path3D(catmullRom.getPoints());
        const tangents: BABYLON.Vector3[] = path3d.getTangents(); // array of tangents to the curve
        const normals: BABYLON.Vector3[] = path3d.getNormals(); // array of normals to the curve
        const binormals: BABYLON.Vector3[] = path3d.getBinormals(); // array of binormals to curve

        catmullRom.getPoints().forEach((point: BABYLON.Vector3, frame: number) => {
            // Add walking point to walk animation.
            keys.push({
                frame: frame,
                value: point
            });

            // Add rotation to rotate animation.
            keysRotation.push({
                frame: frame,
                value: BABYLON.Vector3.RotationFromAxis(
                    normals[frame],
                    binormals[frame],
                    tangents[frame]
                )
            });

            // https://github.com/Temechon/ms-experiences16/tree/master/ts
        });

        // Print debug walking path.
        this._walkingDebugPath = BABYLON.Mesh.CreateLines(
            `walkAnimationDebugPath${this._id}`,
            catmullRom.getPoints(),
            game.gameScene.scene
        );


        if (1 === keys.length) {
            return;
        }

        animationBox.setKeys(keys);
        animationRotation.setKeys(keysRotation);

        this._mesh.animations.push(animationBox);
        this._mesh.animations.push(animationRotation);

        // Begin animation.
        setTimeout(async () => {
            this._walkAnimation = game.gameScene.scene.beginAnimation(this._mesh, 0, frame, false);

            this._walkAnimation.onAnimationEnd = () => {
                // Remove debug path after animation has been completed.
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
