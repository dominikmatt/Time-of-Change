import BuildingFactory from "./Buildings/BuildingFactory";
import Building from "./Buildings/Building";
import BuildBuildingCommand from "./Commands/BuildBuildingCommand";
import Storehouse from "./Buildings/types/Storehouse";
import JobStore from "./Jobs/JobStore";
import Redis from "./Redis";
import Core from "./Core";
import GetMapDataCommand from "./Commands/GetMapDataCommand";
import CreateCharacterCommand from "./Commands/CreateCharacterCommand";
import Character from "./Characters/Character";

export default class Player {
    private readonly _name: string;

    private readonly _token: string;

    private buildings: Array<Building> = [];
    private _characters: Array<Character> = [];
    private readonly _jobStore: JobStore;

    private readonly _db: Redis;

    /**
     * socket.io Socket.
     */
    private _wsSocket: any;

    constructor(name: string, token: string) {
        this._name = name;
        this._token = token;
        this._db = new Redis(Object.keys(Core.players).length + 1);
        this._jobStore = new JobStore(this);

        this._db.flushdb()
            .then(() => console.log('database cleared'))
            .catch((error) => { throw new Error(error); });

        Core.db.hset(`players:${this._token}`, 'name', this._name, );
        Core.db.hset(`players:${this._token}`, 'isMaster', Object.keys(Core.players).length === 0);
    }

    public initializeTown() {
        /** @var Storehouse storehouse */
        const storehouse: Storehouse = this.addBuilding(BuildingFactory('storehouse', {x: 3, z: 3}, this, true));

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
        new GetMapDataCommand(this);
        new CreateCharacterCommand(this);
    }

    public update() {
        this.buildings.forEach((building: Building) => {
            building.update();
        });

        this._characters.forEach((character: Character) => {
            character.update();
        });

        this._jobStore.update();
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

    /**
     * Add a new building to the buildings list.
     */
    public addCharacter(character: Character): any {
        this._characters.push(character);

        return character;
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

    get jobStore(): JobStore {
        return this._jobStore;
    }

    get db(): Redis {
        return this._db;
    }
};
