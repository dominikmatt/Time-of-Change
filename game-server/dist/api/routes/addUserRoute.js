"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Core_1 = __importDefault(require("../../Core"));
const addUserToGame = (req, res) => {
    const token = req.query.token;
    const username = req.query.username;
    Core_1.default.db.hset(`players:${token}`, 'username', username);
    res
        .status(200)
        .json({
        playerAdded: true
    });
};
const addUserRoute = (app) => {
    app.get('/api/add-player', addUserToGame);
};
exports.default = addUserRoute;
//# sourceMappingURL=addUserRoute.js.map