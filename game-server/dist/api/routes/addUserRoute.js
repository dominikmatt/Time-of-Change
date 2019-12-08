"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Core_1 = __importDefault(require("../../Core"));
/**
 curl -POST 'http://localhost:9991/api/add-player' -d '{"token": "test2", "gameToken": "game-token2","username": "added-user"}'


 * @param req
 * @param res
 */
const addUserToGame = (req, res) => {
    const body = req.body;
    const token = body.token;
    const gameToken = body.gameToken;
    const username = body.username;
    Core_1.default.db.hset(`players:${gameToken}`, 'username', username);
    Core_1.default.db.hset(`players:${gameToken}`, 'token', token);
    res
        .status(200)
        .json({
        playerAdded: true
    });
};
const addUserRoute = (app) => {
    const gameToken = 'test';
    Core_1.default.db.hset(`players:${gameToken}`, 'username', 'domready');
    Core_1.default.db.hset(`players:${gameToken}`, 'token', 'test');
    const gameToken1 = 'test1';
    Core_1.default.db.hset(`players:${gameToken1}`, 'username', 'domready1');
    Core_1.default.db.hset(`players:${gameToken1}`, 'token', 'test1');
    app.post('/api/add-player', addUserToGame);
};
exports.default = addUserRoute;
//# sourceMappingURL=addUserRoute.js.map