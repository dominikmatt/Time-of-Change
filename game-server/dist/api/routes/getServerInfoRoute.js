"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Core_1 = __importDefault(require("../../Core"));
const getServerInfo = (req, res) => {
    Core_1.default.db.keys(`players:*`)
        .then((players) => {
        res.status(200)
            .json({
            players: {
                max: 4,
                current: players.length,
            },
            status: {
                gameStatus: Core_1.default.gameState,
            },
            name: process.env.GAME_SERVER_NAME,
        });
    });
};
const getServerInfoRoute = (app) => {
    app.get('/api/info', getServerInfo);
};
exports.default = getServerInfoRoute;
//# sourceMappingURL=getServerInfoRoute.js.map