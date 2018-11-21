import express from 'express';
import * as expressCore from "express-serve-static-core";
import Core from "../../Core";

const addUserToGame = (req: express.Request, res: express.Response): void => {
    const token = req.query.token;
    const username = req.query.username;


    Core.db.hset(`players:${token}`, 'username', username,);

    res
        .status(200)
        .json({
            playerAdded: true
        });
};

const addUserRoute = (app: expressCore.Express) => {
    app.get('/api/add-player', addUserToGame);
};

export default addUserRoute;