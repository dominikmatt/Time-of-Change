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
}
exports.Config = Config;
const config = Config.getInstance();
exports.default = config;
//# sourceMappingURL=Config.js.map