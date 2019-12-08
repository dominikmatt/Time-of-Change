import express from 'express';
import * as expressCore from "express-serve-static-core";
import Core from "../../Core";
import IAddUserRequest from "../../Interfaces/AddUserRequest";

/**
 curl -POST 'http://localhost:9991/api/add-player' -d '{"token": "test2", "gameToken": "game-token2","username": "added-user"}'


 * @param req
 * @param res
 */
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

    const gameToken1 = 'test1';
    Core.db.hset(`players:${gameToken1}`, 'username', 'domready1',);
    Core.db.hset(`players:${gameToken1}`, 'token', 'test1',);

    app.post('/api/add-player', addUserToGame);
};

export default addUserRoute;