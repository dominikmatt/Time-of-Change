"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
class Redis {
    constructor(index) {
        this.connect(index);
    }
    connect(index) {
        this._client = redis_1.default.createClient();
        this._client.select(index);
        this._client.on('error', (error) => {
            throw new Error(error);
        });
    }
    flushdb() {
        return new Promise((resolve, reject) => {
            this._client.flushdb((error, succeeded) => {
                if (error) {
                    return reject(error);
                }
                return resolve(succeeded);
            });
        });
    }
    hset(key, field, value) {
        this._client.hset(key, field, value);
    }
    sadd(key, value) {
        this._client.sadd(key, value);
    }
    spop(key) {
        return new Promise((resolve, reject) => {
            this._client.spop(key, (error, value) => {
                if (error) {
                    return reject(error);
                }
                return resolve(value);
            });
        });
    }
    hget(key, field) {
        return new Promise((resolve, reject) => {
            this._client.hget(key, field, (error, data) => {
                if (error) {
                    return reject(error);
                }
                return resolve(data);
            });
        });
    }
    hgetall(key) {
        return new Promise((resolve, reject) => {
            this._client.hgetall(key, (error, data) => {
                if (error) {
                    return reject(error);
                }
                return resolve(data);
            });
        });
    }
    zadd(values) {
        return new Promise((resolve, reject) => {
            this._client.zadd(values, (error, succeeded) => {
                if (error) {
                    return reject(error);
                }
                return resolve(succeeded);
            });
        });
    }
    del(key) {
        this._client.del(key);
    }
    on(key) {
        return new Promise((resolve, reject) => {
            this._client.on(key, function (channel, message) {
                resolve({
                    channel,
                    message
                });
            });
        });
    }
    subscribe(key) {
        this._client.subscribe(key);
    }
    publish(key, value) {
        this._client.publish(key, value);
    }
}
exports.default = Redis;
//# sourceMappingURL=Redis.js.map