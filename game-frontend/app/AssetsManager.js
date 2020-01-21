"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./Game");
const BABYLON = require("babylonjs");
let instance = null;
const assetsPath = 'assets/models/';
class AssetsManager {
    constructor() {
        this._meshesStore = {};
    }
    static getInstance() {
        if (null === instance) {
            instance = new AssetsManager();
        }
        return instance;
    }
    initialize() {
        return new Promise((resolve) => {
            this._assetsManager = new BABYLON.AssetsManager(Game_1.default.gameScene.scene);
            this._assetsManager.onProgress = function (remainingCount, totalCount, lastFinishedTask) {
                Game_1.default.gameScene.engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
            };
            this._assetsManager.onTaskErrorObservable.add(function (task) {
                console.log('task failed', task.errorObject.message, task.errorObject.exception);
            });
            this._assetsManager.onFinish = resolve;
            this.loadAssets('terrain', 'maps/slishou', 'slishou1.babylon');
            this.loadAssets('tree', 'terrain', 'tree001.babylon');
            this.loadAssets('stone', 'terrain', 'stone.babylon');
            this.loadAssets('acre', 'fields', 'acre.babylon');
            this.loadAssets('armourSmithy', 'buildings', 'armourSmithy.babylon');
            this.loadAssets('armouryWorkshop', 'buildings', 'armouryWorkshop.babylon');
            this.loadAssets('bakery', 'buildings', 'bakery.babylon');
            this.loadAssets('barracks', 'buildings', 'barracks.babylon');
            this.loadAssets('butchers', 'buildings', 'butchers.babylon');
            this.loadAssets('charcoalBurning', 'buildings', 'charcoalBurning.babylon');
            this.loadAssets('farm', 'buildings', 'farm.babylon');
            this.loadAssets('goldSmithy', 'buildings', 'goldSmithy.babylon');
            this.loadAssets('inn', 'buildings', 'inn.babylon');
            this.loadAssets('mill', 'buildings', 'mill.babylon');
            this.loadAssets('mine', 'buildings', 'mine.babylon');
            this.loadAssets('quarry', 'buildings', 'quarry.babylon');
            this.loadAssets('sawmill', 'buildings', 'sawmill.babylon');
            this.loadAssets('schoolhouse', 'buildings', 'schoolhouse.babylon');
            this.loadAssets('smithy', 'buildings', 'smithy.babylon');
            this.loadAssets('storehouse', 'buildings', 'storehouse.babylon');
            this.loadAssets('swineFarm', 'buildings', 'swineFarm.babylon');
            this.loadAssets('tannery', 'buildings', 'tannery.babylon');
            this.loadAssets('tower', 'buildings', 'tower.babylon');
            this.loadAssets('vineyard', 'buildings', 'vineyard.babylon');
            this.loadAssets('weaponSmithy', 'buildings', 'weaponSmithy.babylon');
            this.loadAssets('weaponsWorkshop', 'buildings', 'weaponsWorkshop.babylon');
            this.loadAssets('woodcutters', 'buildings', 'woodcutters.babylon');
            this.loadAssets('character', 'characters/viking', 'viking.babylon');
            this._assetsManager.load();
        });
    }
    loadAssets(name, path, filename) {
        const meshTask = this._assetsManager.addMeshTask(`${name}-task`, '', `${assetsPath}${path}/`, filename);
        meshTask.onError = function (task, message, exception) {
            console.log(message, exception);
        };
        meshTask.onSuccess = (task) => {
            task.loadedMeshes.forEach((mesh) => {
                mesh.isVisible = false;
            });
            this._meshesStore[name] = task.loadedMeshes;
        };
    }
    getBuildingMeshByName(name, key) {
        let banner = null;
        let mainMesh = null;
        if (this._meshesStore[name]) {
            this._meshesStore[name].forEach((mesh) => {
                if ('banner' === mesh.id) {
                    banner = mesh.clone(`${name}-${key}-banner`);
                }
                else {
                    mainMesh = mesh.clone(`${name}-${key}-main`);
                }
            });
            if (banner && mainMesh) {
                banner.parent = mainMesh;
            }
            return mainMesh;
        }
    }
    getCharacterMeshByName(name, key) {
        if (this._meshesStore[name]) {
            const mesh = this._meshesStore[name][0].clone(`${name}-${key}`);
            mesh.skeleton = this._meshesStore[name][0].skeleton.clone('skeleton', `${name}-skeleton-${key}`);
            return mesh;
        }
        return null;
    }
    getTreeMeshByName(name, instanceName) {
        if (this._meshesStore[name]) {
            const tree = this._meshesStore[name][0];
            tree.scaling = new BABYLON.Vector3(0.07, 0.07, 0.07);
            tree.position = BABYLON.Vector3.Zero();
            return this._meshesStore[name][0].createInstance(instanceName);
        }
        return null;
    }
    getStoneMeshByName(name, instanceName) {
        if (this._meshesStore[name]) {
            const stone = this._meshesStore[name][0];
            stone.position = BABYLON.Vector3.Zero();
            return this._meshesStore[name][0].createInstance(instanceName);
        }
        return null;
    }
    getFieldMeshByName(name, instanceName) {
        if (this._meshesStore[name]) {
            const stone = this._meshesStore[name][0];
            stone.position = BABYLON.Vector3.Zero();
            return this._meshesStore[name][0].createInstance(instanceName);
        }
        return null;
    }
    getTerrainMeshByName(name) {
        if (this._meshesStore[name]) {
            return this._meshesStore[name][0];
        }
        return null;
    }
}
exports.AssetsManager = AssetsManager;
const assetsManager = AssetsManager.getInstance();
exports.default = assetsManager;
//# sourceMappingURL=AssetsManager.js.map