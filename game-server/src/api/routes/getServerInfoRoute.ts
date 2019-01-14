import Core from "../../Core";
import express from 'express';
import * as expressCore from "express-serve-static-core";

const getServerInfo = (req: express.Request, res: express.Response): void => {
    Core.db.keys(`players:*`)
        .then((players: string[]) => {
            res.status(200)
                .json({
                    players: {
                        max: 4,
                        current: players.length,
                    },
                    status: {
                        gameStatus: 'WAITING_FOR_PLAYERS',
                    },
                    name: process.env.GAME_SERVER_NAME,
                });
        });
};

const getServerInfoRoute = (app: expressCore.Express) => {
    app.get('/api/info', getServerInfo);
};

export default getServerInfoRoute;