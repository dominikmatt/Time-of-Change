import redis from 'redis';
import Core from "./Core";

export default class Redis {
    private _client: any;

    constructor(index: number) {
        this.connect(index);
    }

    private connect(index: number) {
        this._client = redis.createClient();
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

    public hset(key: string, field: string, value: any) {
        this._client.hset(key, field, value);
    }

    public sadd(key: string, value: any) {
        this._client.sadd(key, value);
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

    public subscribe(key: string) {
        this._client.subscribe(key);
    }

    public publish(key: string, value: any) {
        this._client.publish(key, value);
    }
}