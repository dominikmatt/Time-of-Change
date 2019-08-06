import EventsAbstract from "./EventsAbstract";
import {GameStates} from "../enums/GameStates";

let instance: GameStateChangedEvent = null;

export interface GameStateChangedOptionsInterface {
    gameState: GameStates,
    playersCount: Number
}

class GameStateChangedEvent extends EventsAbstract {
    public static getInstance(): GameStateChangedEvent {
        if (null === instance) {
            instance = new this();
        }

        return instance;
    }
}

const event: EventsAbstract = GameStateChangedEvent.getInstance();

export default event;
