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
import PanelBuildingSelected from "./Commands/PanelBuildingSelected";
import MapStartupInterface from "./Interfaces/MapStartup";
import Panel from "./Panel/panel";
import BuildFieldCommand from "./Commands/BuildFieldCommand";
import IAddField from "./Interfaces/AddField";
import Field from "./Field/Field";
import {PositionInterface} from "./Components/PositionComponent";
import PanelFieldSelected from "./Commands/PanelFieldSelected";

export default class Player {
    private readonly _name: string;

    private readonly _token: string;

    private _buildings: Array<Building> = [];
    private _fields: Array<Field> = [];
    private _characters: Array<Character> = [];
    private readonly _jobStore: JobStore;
    private readonly _buildingManager: BuildingManager;
    private _panel: Panel;

    private readonly _db: Redis;

    private readonly _playerId: number;

    /**
     * socket.io Socket.
     */
    private _wsSocket: any;
    private readonly _index: number;

    constructor(name: string, token: string, playerId: number) {
        this._name = name;
        this._token = token;
        this._db = new Redis(Object.keys(Core.players).length + 1);
        this._jobStore = new JobStore(this);
        this._buildingManager = new BuildingManager(this);
        this._playerId = playerId;
        this._index = this._playerId - 1;

        this._db.flushdb()
            .then(() => console.log('database cleared for player ', this._playerId))
            .catch((error) => {
                throw new Error(error);
            });


        Core.db.hset(`players:${this._token}`, 'isMaster', Object.keys(Core.players).length === 0);
    }

    public initializeTown() {
        const startup: MapStartupInterface = require('./Map/maps/slishou/startup')[this._index];
        startup.player = this;
        startup.placeHouses();
    }

    /**
     * Bin websocket event listeners.
     */
    public listenWs() {
        new BuildBuildingCommand(this);
        new BuildFieldCommand(this);
        new GetMapDataCommand(this);
        new CreateCharacterCommand(this);
        new PanelBuildingSelected(this);
        new PanelFieldSelected(this);
    }

    public update(delta: number) {
        this._buildings.forEach((building: Building) => {
            building.update(delta);
        });

        this._characters.forEach((character: Character, index: number) => {
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

    /**
     * Add a new building to the buildings list.
     *
     * @param {Field} field
     */
    public addField(field: Field): Field {
        this._fields.push(field);

        return field;
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

    public getBuildingByType(buildingType: string, hasCharacter: boolean = false, isBuilt: boolean = true): Building | null {
        const buildings = this._buildings.filter((building: Building) => {
            return buildingType === building.getType()
                && (null === building.character || true === hasCharacter)
                && (true === building.completelyBuilt || false === isBuilt);
        });

        if (0 < buildings.length) {
            return buildings[0];
        }

        return null;
    }

    public getNearestFreeFields(position: PositionInterface): Field[] {
        return this._fields.map((field: Field): {distance: number, field: Field} => {
            let a = position.x - field.position.x;
            let b = position.z - field.position.z;

            if (0 > a) {
                a = -(a);
            }

            if (0 > b) {
                b = -(b);
            }

            const distance = Math.sqrt((a * 2) + (b * 2));

            return {
                distance,
                field,
            }
        })
            .sort((a, b): number => {
               return a.distance - b.distance;
            })
            .filter((data): boolean => {
               return null === data.field.building;
            })
            .map((data): Field => {
                return data.field;
            });
    }

    public getFieldByPosition(position: PositionInterface): Field | null {
        const field: Field = this._fields.find(field => {
            return field.position.position.x === position.x && field.position.z === position.z
        });

        if (!field) {
            return null;
        }

        return field;
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

    set panel(value: Panel) {
        this._panel = value;
    }

    get panel() {
        return this._panel;
    }

    get jobStore(): JobStore {
        return this._jobStore;
    }

    get db(): Redis {
        return this._db;
    }

    get buildings(): Array<Building | Storehouse> {
        return this._buildings;
    }

    get buildingManager(): BuildingManager {
        return this._buildingManager;
    }

    get playerId(): number {
        return this._playerId;
    }
};
