let instance: Config = null;

interface ConfigInterface {
    [key:string]: any;
}

export class Config {
    private _config: ConfigInterface;
    public static getInstance(): Config {
        if (null === instance) {
            instance = new this();
        }

        return instance;
    }

    constructor() {
        let env = 'prod';

        if (process.env.ELECTRON_ENV) {
            env = process.env.ELECTRON_ENV;
        }

        this._config = require(`${__dirname}/config.${env}`).default;
    }

    get(key: string, defaultValue: any = ''): any {
        if (!this.exists(key)) {
            return defaultValue;
        }

        return this._config[key];
    }

    exists(key: string): boolean {
        if (this._config[key]) {
            return true;
        }

        return false;
    }
}

const config: Config = Config.getInstance();

export default config;
