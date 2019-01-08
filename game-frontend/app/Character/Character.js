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
        this._position = position;
        this._id = id;
        this.load();
        let lastPosition = position;
        Game_1.default.gameScene.scene.registerBeforeRender(() => {
            if (!this._walkAnimation || !this._mesh) {
                return;
            }
            const currentPosition = this._mesh.position;
            if (currentPosition.x < lastPosition.x) {
                this._mesh.rotation.y = Math.PI / 2 * 2;
            }
            else if (currentPosition.x > lastPosition.x) {
                this._mesh.rotation.y = Math.PI / 2 * 4;
            }
            else if (currentPosition.z > lastPosition.z) {
                this._mesh.rotation.y = Math.PI / 2 * 3;
            }
            else {
                this._mesh.rotation.y = Math.PI / 2 * 1;
            }
            lastPosition = this._mesh.position;
        });
    }
    set position(position) {
        this._position = position;
        //this.setPosition();
    }
    /**
     * Load character and place it to the scene.
     */
    load() {
        this._mesh = AssetsManager_1.default.getCharacterMeshByName('character', this._id);
        this._mesh.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
        this.setPosition();
        Game_1.default.gameScene.shadowGenerator.getShadowMap().renderList.push(this._mesh);
        // Show meshes.
        this._mesh.isVisible = true;
    }
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
        var animationBox = new BABYLON.Animation(`walkAnimation${this._id}`, "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        // Animation keys
        const keys = [];
        let frame = 0;
        const debugPath = [];
        this._walkingPath.forEach((point, index) => {
            frame = index * 30;
            const vector = new Vector3(point.x + 0.5, Game_1.default.gameScene.terrain.getHeight(point.x, point.z, true), point.z + 0.5);
            debugPath.push(vector);
            keys.push({
                frame: frame,
                value: vector,
            });
        });
        var catmullRom = BABYLON.Curve3.CreateCatmullRomSpline(debugPath, 30);
        this._walkingDebugPath = BABYLON.Mesh.CreateLines("catmullRom", catmullRom.getPoints(), Game_1.default.gameScene.scene);
        if (1 === keys.length) {
            return;
        }
        animationBox.setKeys(keys);
        this._mesh.animations.push(animationBox);
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            this._walkAnimation = Game_1.default.gameScene.scene.beginAnimation(this._mesh, 0, frame, false);
            this._walkAnimation.onAnimationEnd = (() => {
                this._walkingDebugPath.dispose();
            });
        }));
    }
    set walkingPath(path) {
        if (false === this._isWalking && 0 < path.length) {
            console.log('start');
            this._walkingPath = path;
            this.startWalking();
        }
        this._walkingPath = path;
    }
    set isWalking(value) {
        this._isWalking = value;
    }
}
exports.default = Character;
//# sourceMappingURL=Character.js.map