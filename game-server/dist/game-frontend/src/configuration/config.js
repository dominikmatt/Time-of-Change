"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let instance = null;
class Config {
    static getInstance() {
        if (null === instance) {
            instance = new this();
        }
        return instance;
    }
    constructor() {
        this._config = require(`${__dirname}/config.${process.env.ELECTRON_ENV}`).default;
    }
    get(key, defaultValue = '') {
        if (!this.exists(key)) {
            return defaultValue;
        }
        return this._config[key];
    }
    exists(key) {
        if (this._config[key]) {
            return true;
        }
        return false;
    }
}
exports.Config = Config;
const config = Config.getInstance();
exports.default = config;
//# sourceMappingURL=config.js.map