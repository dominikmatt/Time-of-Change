import redis from "redis";

/**
 * This is a wrapping class for redis to implement Promise callbacks.
 */
export default class Redis {
    private _client: any;

    constructor(index: number) {
        this.connect(index);
    }

    private connect(index: number) {
        this._client = redis.createClient({
            host: process.env.REDIS_HOST
        });
        this._client.select(index);

        this._client.on('error', (error: string) => {
            throw new Error(error);
        });
    }

    public flushdb() {
        return new Promise((resolve, reject) => {
            this._client.flushdb( (error: any, succeeded: any) => {
                if (error) {
                    return reject(error);
                }

                return resolve(succeeded);
            });
        });
    }

    public keys(key: string) {
        return new Promise((resolve, reject) => {
            this._client.keys(key, (error: any, value: any) => {
                if (error) {
                    return reject(error);
                }

                return resolve(value);
            });
        });
    }

    public scan(key: string) {
        return new Promise((resolve, reject) => {
            this._client.scan(key, (error: any, value: any) => {
                if (error) {
                    return reject(error);
                }

                return resolve(value);
            });
        });
    }

    public set(key: string, value: any) {
        this._client.set(key, value);
    }

    public hset(key: string, field: string, value: any) {
        this._client.hset(key, field, value);
    }

    public rpush(key: string, value: any) {
        this._client.rpush(key, value);
    }

    public sadd(key: string, value: any) {
        this._client.sadd(key, value);
    }

    public lpop(key: string) {
        return new Promise((resolve, reject) => {
            this._client.lpop(key, (error: any, value: any) => {
                if (error) {
                    return reject(error);
                }

                return resolve(value);
            });
        });
    }

    public lrange(key: string, from: number, to: number) {
        return new Promise((resolve, reject) => {
            this._client.lrange(key, from, to, (error: any, value: any) => {
                if (error) {
                    return reject(error);
                }

                return resolve(value);
            });
        });
    }

    public spop(key: string) {
        return new Promise((resolve, reject) => {
            this._client.spop(key, (error: any, value: any) => {
                if (error) {
                    return reject(error);
                }

                return resolve(value);
            });
        });
    }

    public hget(key: string, field: string) {
        return new Promise((resolve, reject) => {
            this._client.hget(key, field, (error: any, data: any) => {
                if (error) {
                    return reject(error);
                }

                return resolve(data);
            });
        });
    }

    public hgetall(key: string) {
        return new Promise((resolve, reject) => {
            this._client.hgetall(key, (error: any, data: any) => {
                if (error) {
                    return reject(error);
                }

                return resolve(data);
            });
        });
    }

    public zadd(values: any[]) {
        return new Promise((resolve, reject) => {
            this._client.zadd(values, (error: any, succeeded: any) => {
                if (error) {
                    return reject(error);
                }

                return resolve(succeeded);
            });
        });
    }

    public del(key: string) {
        this._client.del(key);
    }

    public on(key: string) {
        return new Promise((resolve, reject) => {
            this._client.on(key, function(channel: string, message: string) {
                resolve({
                    channel,
                    message
                });
            });
        });
    }

    public subscribe(key: string, callback: Function) {
        this._client.subscribe(key, callback);
    }

    public publish(key: string, value: any) {
        this._client.publish(key, value);
    }
}
