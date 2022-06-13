import { createClient, RedisClientType } from 'redis';

/**
 * This is a wrapping class for redis to implement Promise callbacks.
 */
export default class Redis {
  private _client: RedisClientType;

  constructor() {

  }

  public async connect(index: number): Promise<void> {
    this._client = createClient({
      url: 'redis://localhost:6379',
      commandsQueueMaxLength: 1000000
    });

    this._client.on('error', (error: string) => {
      throw new Error(error);
    });

    await this._client
      .connect()
      .catch((error) => console.log(error));

    return await this._client.select(index);
  }

  public async flushdb() {

    return await this._client.flushDb();
  }

  public async keys(key: string) {
      return await this._client.keys(key);
  }

  public set(key: string, value: any) {
    this._client.set(key, value);
  }

  public async hset(key: string, field: string, value: string | Buffer) {
    try {
      return await this._client.sendCommand(['hset', key, field, value]);

    } catch (error) {
      console.log(error);
    }
  }

  public async rpush(key: string, value: any) {
    return await this._client.rPush(key, value);
  }

  public async sadd(key: string, value: any) {
    return await this._client.sAdd(key, value);
  }

  public async lpop(key: string) {
    return await this._client.lPop(key);
  }

  public async lrange(key: string, from: number, to: number) {
    return await this._client.lRange(key, from, to);
  }

  public async spop(key: string) {
    return await this._client.sPop(key);
  }

  public hget(key: string, field: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const values = await this._client.hGet(key, field);

        resolve(values);
      } catch (error) {
        reject(error);
      }
    })
  }

  public async hgetall(key: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const values = await this._client.hGetAll(key);
        resolve(values);
      } catch (error) {
        reject(error);
      }
    });
  }

  public del(key: string) {
    this._client.del(key);
  }

  public on(key: string) {
    return new Promise((resolve, reject) => {
      this._client.on(key, function (channel: string, message: string) {
        resolve({
          channel,
          message,
        });
      });
    });
  }
}
