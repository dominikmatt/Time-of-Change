"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EconomyBuilding_1 = require("../EconomyBuilding");
const CostComponent_1 = require("../../Components/CostComponent");
const TransportJob_1 = require("../../Jobs/types/TransportJob");
class Inn extends EconomyBuilding_1.default {
    constructor(player, position, alreadyBuilt = false) {
        super(player, position);
        this._matrix = [
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 2, 1, 1],
        ];
        this._maxFoodStore = 5;
        this._currentTransportJobs = {
            sausages: 0,
            beer: 0,
            loaves: 0,
        };
        this._resources = {
            sausages: 0,
            beer: 0,
            loaves: 0,
        };
        this._cost = new CostComponent_1.default({
            timber: 6,
            stones: 5
        });
        this.build(alreadyBuilt);
    }
    beforeUpdate() {
        this.addNextJob();
    }
    addNextJob() {
        // Add sausage transport job.
        if (this._resources.sausages + this._currentTransportJobs.sausages < this._maxFoodStore) {
            this._currentTransportJobs.sausages++;
            this._player.jobStore.addJob(new TransportJob_1.default(this._player, this.doorPosition, 'sausages', this));
        }
        // Add loaves transport job.
        if (this._resources.loaves + this._currentTransportJobs.loaves < this._maxFoodStore) {
            this._currentTransportJobs.loaves++;
            this._player.jobStore.addJob(new TransportJob_1.default(this._player, this.doorPosition, 'loaves', this));
        }
        // Add beer transport job.
        if (this._resources.beer + this._currentTransportJobs.beer < this._maxFoodStore) {
            this._currentTransportJobs.beer++;
            this._player.jobStore.addJob(new TransportJob_1.default(this._player, this.doorPosition, 'beer', this));
        }
    }
    afterResourceAdded(type) {
        super.afterResourceAdded(type);
        this._currentTransportJobs[type]--;
    }
    /**
     * Decrease sausages by 1.
     * Return true if inn has sausages.
     */
    useSausages() {
        if (0 === this._resources.sausages) {
            return false;
        }
        this._resources.sausages--;
        return true;
    }
    /**
     * Decrease loaves by 1.
     * Return true if inn has loaves.
     */
    useLoaves() {
        if (0 === this._resources.loaves) {
            return false;
        }
        this._resources.loaves--;
        return true;
    }
    /**
     * Decrease beer by 1.
     * Return true if inn has beer.
     */
    useBeer() {
        if (0 === this._resources.beer) {
            return false;
        }
        this._resources.beer--;
        return true;
    }
    getBuildingData() {
        return {};
    }
    get currentSausagesStore() {
        return this._resources.sausages;
    }
    get currentBeerStore() {
        return this._resources.beer;
    }
    get currentLoavesStore() {
        return this._resources.loaves;
    }
}
exports.default = Inn;
//# sourceMappingURL=Inn.js.map