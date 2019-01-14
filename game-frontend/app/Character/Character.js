"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("../Game");
const AssetsManager_1 = require("../AssetsManager");
var Vector3 = BABYLON.Vector3;
class Character {
    constructor(id, position) {
        this._walkingPath = [];
        this._isWalking = false;
        this._nextPosition = new BABYLON.Vector3(0, 0, 0);
        this._position = position;
        this._id = id;
        this._nextPositionDebugSphere = BABYLON.Mesh.CreateSphere("sphere", 0.5, 0.5, Game_1.default.gameScene.scene);
        this._nextPositionDebugSphere.material = new BABYLON.StandardMaterial("sphereMat", Game_1.default.gameScene.scene);
        this.load();
    }
    set position(position) {
        this._position = position;
    }
    /**
     * Load character and place it to the scene.
     */
    load() {
        this._mesh = AssetsManager_1.default.getCharacterMeshByName('character', this._id);
        this._mesh.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
        this.setPosition();
        this.findSkeleton();
        this.addAnimation('idle', 0, 320);
        this.addAnimation('walk', 323, 364);
        this.addAnimation('dance', 367, 738);
        this.playAnimation('idle', true);
        Game_1.default.gameScene.shadowGenerator.getShadowMap().renderList.push(this._mesh);
        Game_1.default.gameScene.scene.registerBeforeRender(() => {
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
    findSkeleton() {
        // Stop mesh animations
        this._mesh.getScene().stopAnimation(this._mesh);
        // Find skeleton if possible
        if (this._mesh.skeleton) {
            console.log('animation');
            this._skeleton = this._mesh.skeleton;
            // Stop skeleton animations
            this._mesh.getScene().stopAnimation(this._skeleton);
            // Activate animation blending
            this._skeleton.enableBlending(0.08);
        }
        this._skeleton.beginAnimation('idle', true, 1);
    }
    /**
     * Play the given animation if skeleton found
     */
    playAnimation(name, loop, speed = 1) {
        if (this._skeleton) {
            this._skeleton.beginAnimation(name, loop, speed);
        }
    }
    /**
     * @deprecated
     */
    setPosition() {
        if (!this._mesh) {
            return;
        }
        this._mesh.position = BABYLON.Vector3.Zero();
        this._mesh.position.x = this._position.x;
        this._mesh.position.y = Game_1.default.gameScene.terrain.getHeight(this._position.x, this._position.z, true);
        this._mesh.position.z = this._position.z;
        this._mesh.rotation.y = Math.PI / 2 * 3;
    }
    setHealt(currentHealth, maxHealth) {
        if (!this._mesh) {
            return;
        }
        if (maxHealth === 0) {
            maxHealth = 1;
        }
        this._mesh.position.y = currentHealth / maxHealth - 1;
    }
    startWalking() {
        //Create a scaling animaation at 30 FPS
        var animationBox = new BABYLON.Animation(`walkAnimationPod${this._id}`, "position", 5, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        // Animation keys
        const keys = [];
        let frame = 0;
        const path = [];
        //
        this._walkingPath.forEach((point, index) => {
            frame = index * 10;
            const vector = new Vector3(point.x + 0.5, Game_1.default.gameScene.terrain.getHeight(point.x, point.z, true), point.z + 0.5);
            path.push(vector);
        });
        let catmullRom = BABYLON.Curve3.CreateCatmullRomSpline(path, 5);
        catmullRom.getPoints().forEach((point, frame) => {
            // Add walking point to walk animation.
            keys.push({
                frame: frame,
                value: point
            });
            // https://github.com/Temechon/ms-experiences16/tree/master/ts
        });
        // Print debug walking path.
        this._walkingDebugPath = BABYLON.Mesh.CreateLines(`walkAnimationDebugPath${this._id}`, catmullRom.getPoints(), Game_1.default.gameScene.scene);
        if (1 === keys.length) {
            return;
        }
        animationBox.setKeys(keys);
        this._mesh.animations.push(animationBox);
        // Begin animation.
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            this._walkAnimation = Game_1.default.gameScene.scene.beginAnimation(this._mesh, 0, frame, false);
            this.playAnimation('walk', true);
            this._walkAnimation.onAnimationEnd = () => {
                // Remove debug path after animation has been completed.
                this._walkingDebugPath.dispose();
                this.playAnimation('idle', true);
            };
        }));
    }
    /**
     * The character looks at the given position, but rotates only along Y-axis
     * */
    lookAt(value) {
        var dv = value.subtract(this._mesh.position);
        var yaw = -Math.atan2(dv.z, dv.x) - Math.PI / 2;
        this._mesh.rotation.y = yaw;
    }
    /**
     * Add an animation to this character
     */
    addAnimation(name, from, to) {
        if (this._skeleton) {
            this._skeleton.createAnimationRange(name, from, to);
        }
    }
    set walkingPath(path) {
        if (false === this._isWalking && 0 < path.length) {
            this._walkingPath = path;
            this.startWalking();
        }
        this._walkingPath = path;
    }
    set isWalking(value) {
        this._isWalking = value;
    }
    set nextPosition(position) {
        this._nextPosition = position;
    }
}
exports.default = Character;
//# sourceMappingURL=Character.js.map