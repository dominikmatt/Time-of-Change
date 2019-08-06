"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameStates_1 = require("../../enums/GameStates");
const GameStateChangedEvent_1 = require("../../Events/GameStateChangedEvent");
class GameStateChanged {
    constructor() {
        this._gameState = GameStates_1.GameStates.WaitingForPlayers;
        this._modalEl = document.getElementById('game-state-modal');
        this.bindEvents();
    }
    bindEvents() {
        GameStateChangedEvent_1.default.addCallBack((options) => {
            this.changeGameState(options);
        });
    }
    changeGameState(options) {
        this._gameState = options.gameState;
        if (GameStates_1.GameStates.WaitingForPlayers == this._gameState) {
            this.showGameStateWaitingModal(options.playersCount);
        }
        else {
            this.closeGameStateModal();
        }
    }
    showGameStateWaitingModal(playersCount) {
        const backdropEl = document.querySelector('.backdrop');
        this._modalEl.innerHTML = `<h3>Waiting for players: ${playersCount}/4</h3>`;
        backdropEl.style.display = 'block';
        this._modalEl.style.display = 'block';
    }
    closeGameStateModal() {
        const backdropEl = document.querySelector('.backdrop');
        backdropEl.style.display = 'none';
        this._modalEl.style.display = 'none';
    }
}
exports.default = GameStateChanged;
//# sourceMappingURL=GameStateChanged.js.map