import redis from 'redis';
import Player from './Player';

export default class Redis {
    private _client: any;
    private _player: Player;

    constructor(player: Player) {
        this._player = player;

        this.connect();
    }

    private connect() {
        this._client = redis.createClient();

        this._client.on('error', (err: string) => {
            console.log('Redis Error ' + err);
        });
    }

    public hset(key: string, field: string, value: string, addToken: boolean = true) {
        if (addToken) {
            key = this._player.token + '_' + key;
        }

        this._client.hset(key, field, value);
    }
}