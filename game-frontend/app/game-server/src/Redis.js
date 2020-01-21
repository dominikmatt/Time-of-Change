"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
/**
 * This is a wrapping class for redis to implement Promise callbacks.
 */
class Redis {
    constructor(index) {
        this.connect(index);
    }
    connect(index) {
        this._client = redis_1.default.createClient({
            port: 9990,
            host: process.env.REDIS_HOST
        });
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
    keys(key) {
        return new Promise((resolve, reject) => {
            this._client.keys(key, (error, value) => {
                if (error) {
                    return reject(error);
                }
                return resolve(value);
            });
        });
    }
    scan(key) {
        return new Promise((resolve, reject) => {
            this._client.scan(key, (error, value) => {
                if (error) {
                    return reject(error);
                }
                return resolve(value);
            });
        });
    }
    set(key, value) {
        this._client.set(key, value);
    }
    hset(key, field, value) {
        this._client.hset(key, field, value);
    }
    rpush(key, value) {
        this._client.rpush(key, value);
    }
    sadd(key, value) {
        this._client.sadd(key, value);
    }
    lpop(key) {
        return new Promise((resolve, reject) => {
            this._client.lpop(key, (error, value) => {
                if (error) {
                    return reject(error);
                }
                return resolve(value);
            });
        });
    }
    lrange(key, from, to) {
        return new Promise((resolve, reject) => {
            this._client.lrange(key, from, to, (error, value) => {
                if (error) {
                    return reject(error);
                }
                return resolve(value);
            });
        });
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
    subscribe(key, callback) {
        this._client.subscribe(key, callback);
    }
    publish(key, value) {
        this._client.publish(key, value);
    }
}
exports.default = Redis;
//# sourceMappingURL=Redis.js.map