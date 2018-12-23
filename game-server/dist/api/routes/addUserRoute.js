"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Core_1 = __importDefault(require("../../Core"));
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
    app.post('/api/add-player', addUserToGame);
};
exports.default = addUserRoute;
//# sourceMappingURL=addUserRoute.js.map