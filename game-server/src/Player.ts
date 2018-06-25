import BuildingFactory from "./Buildings/BuildingFactory";
import Building from "./Buildings/Building";
import BuildBuildingCommand from "./Commands/BuildBuildingCommand";
import Storehouse from "./Buildings/types/Storehouse";
import jobStore from "./Jobs/jobStore";
import Redis from "./Redis";

export default class Player {
    private readonly _name: string;

    private readonly _token: string;

    private buildings: Array<Building> = [];

    /**
     * socket.io Socket.
     */
    private _wsSocket: any;
    private readonly _database: Redis;

    constructor(name: string, token: string) {
        this._name = name;
        this._token = token;
        this._database = new Redis(this);

        this._database.hset('players', this._name, this._token, false);
    }

    public initializeTown() {
        /** @var Storehouse storehouse */
        const storehouse: Storehouse = this.addBuilding(BuildingFactory('storehouse', {x: 10, y: 0, z: 0}, this, true));

        storehouse.addResources({
            stones: 60,
            timber: 50,
            gold: 60,
            wine: 40,
            loaves: 30,
            sausages: 20,
        });
    }

    /**
     * Bin websocket event listeners.
     */
    public listenWs() {
        new BuildBuildingCommand(this);
    }

    public update() {
        this.buildings.forEach((building: Building) => {
            building.update();
        });

        jobStore.update();
    }

    /**
     * Add a new building to the buildings list.
     *
     * @param {Building} building
     */
    public addBuilding(building: Building): any {
        this.buildings.push(building);

        return building;
    }

    get name(): string {
        return this._name;
    }

    get token(): string {
        return this._token;
    }

    get wsSocket(): any {
        return this._wsSocket;
    }

    set wsSocket(value: any) {
        this._wsSocket = value;
    }

    get database(): Redis {
        return this._database;
    }
};
