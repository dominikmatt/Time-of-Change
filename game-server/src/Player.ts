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
import BuildingManager from "./Buildings/BuildingManager";
import CharacterFactory from "./Characters/CharacterFactory";
import PanelBuildingSelected from "./Commands/PanelBuildingSelected";
import Schoolhouse from "./Buildings/types/Schoolhouse";

export default class Player {
    private readonly _name: string;

    private readonly _token: string;

    private _buildings: Array<Building> = [];
    private _characters: Array<Character> = [];
    private readonly _jobStore: JobStore;
    private readonly _buildingManager: BuildingManager;

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
        this._buildingManager = new BuildingManager(this);

        this._db.flushdb()
            .then(() => console.log('database cleared'))
            .catch((error) => {
                throw new Error(error);
            });

        Core.db.hset(`players:${this._token}`, 'name', this._name,);
        Core.db.hset(`players:${this._token}`, 'isMaster', Object.keys(Core.players).length === 0);
    }

    public initializeTown() {
        /** @var Storehouse storehouse */
        this.addCharacter(CharacterFactory('hero', 'start', this));
        this.addCharacter(CharacterFactory('serf', 'start', this));
        this.addCharacter(CharacterFactory('serf', 'start', this));
        this.addCharacter(CharacterFactory('laborer', 'start', this));
        const storehouse: Storehouse = this.addBuilding(BuildingFactory('storehouse', {x: 3, z: 3}, this, true));
        const schoolhouse: Schoolhouse = this.addBuilding(BuildingFactory('schoolhouse', {x: 3, z: 8}, this, true));

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
        new PanelBuildingSelected(this);
    }

    public update() {
        this._buildings.forEach((building: Building) => {
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
        this._buildings.push(building);

        return building;
    }

    public getBuildingById(buildingId: string): Building | null {
        const buildings = this._buildings.filter((building: Building) => {
            return buildingId === building.id;
        });

        if (0 < buildings.length) {
            return buildings[0];
        }

        return null;
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

    get buildings(): Array<Building> {
        return this._buildings;
    }

    get buildingManager(): BuildingManager {
        return this._buildingManager;
    }
};
