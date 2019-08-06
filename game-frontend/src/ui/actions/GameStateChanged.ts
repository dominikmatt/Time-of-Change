import {GameStates} from "../../enums/GameStates";
import {GameStateChangedOptionsInterface, default as gameStateChangedEvent} from "../../Events/GameStateChangedEvent";

export default class GameStateChanged {
    private _gameState: GameStates = GameStates.WaitingForPlayers;
    private _modalEl: HTMLElement;

    constructor() {
        this._modalEl = document.getElementById('game-state-modal');
        this.bindEvents();
    }

    private bindEvents() {
        gameStateChangedEvent.addCallBack(
            (options: GameStateChangedOptionsInterface) => {
                this.changeGameState(options)
            });
    }

    private changeGameState(options: GameStateChangedOptionsInterface) {
        this._gameState = options.gameState;

        if (GameStates.WaitingForPlayers == this._gameState) {
            this.showGameStateWaitingModal(options.playersCount);
        } else {
            this.closeGameStateModal();
        }
    }

    private showGameStateWaitingModal(playersCount: Number) {
        const backdropEl: HTMLElement = document.querySelector('.backdrop');

        this._modalEl.innerHTML = `<h3>Waiting for players: ${playersCount}/4</h3>`;
        backdropEl.style.display = 'block';
        this._modalEl.style.display = 'block';
    }

    private closeGameStateModal() {const backdropEl: HTMLElement = document.querySelector('.backdrop');

        backdropEl.style.display = 'none';
        this._modalEl.style.display = 'none';
    }
}
