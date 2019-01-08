import express from 'express';
import * as expressCore from "express-serve-static-core";
import Core from "../../Core";
import IAddUserRequest from "../../Interfaces/AddUserRequest";

const addUserToGame = (req: express.Request, res: express.Response): void => {
    const body: IAddUserRequest = (<IAddUserRequest>req.body);
    const token = body.token;
    const gameToken = body.gameToken;
    const username = body.username;


    Core.db.hset(`players:${gameToken}`, 'username', username,);
    Core.db.hset(`players:${gameToken}`, 'token', token,);

    res
        .status(200)
        .json({
            playerAdded: true
        });
};

const addUserRoute = (app: expressCore.Express) => {
    const gameToken = 'test';
    Core.db.hset(`players:${gameToken}`, 'username', 'domready',);
    Core.db.hset(`players:${gameToken}`, 'token', 'test',);

    app.post('/api/add-player', addUserToGame);
};

export default addUserRoute;