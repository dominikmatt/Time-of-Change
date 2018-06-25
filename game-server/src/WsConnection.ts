import core from "./Core";
import Player from "./Player";
import http from 'http';
import Server, {Socket} from 'socket.io';

const app = http.createServer(() => {});
const io = Server(app);

interface QueryInterface {
    username: string;
    token: string;
    [key: string]: string;
};

app.listen(9001);

/**
 * Check if connectiondata like token and username has been set on the connection request.
 */
io.use((socket: Socket, next: Function) => {
    const query: QueryInterface = socket.handshake.query;
    const token: string = query.token || '';
    const username: string = query.username || '';

    if ('' !== token && '' !== username) {
        return next();
    } else {
        return next(new Error('Authentication error'));
    }
});

/**
 * Player has connected.
 * Create a new player or connect to the given player-instance.
 */
io.on('connection', (socket: any) => {
    const query: QueryInterface = socket.handshake.query;
    const token: string = query.token;

    // Player is already connected set the new socket to player and bind listeners.
    if ((<any>core).players[token]) {
        (<any>core).players[token].wsSocket = socket;
        (<any>core).players[token].listenWs();

        return;
    }

    // Create a new player.
    const newPlayer = new Player(query.username, token);

    core.addPlayer(newPlayer);
    newPlayer.wsSocket = socket;
    newPlayer.listenWs();
    newPlayer.initializeTown();
});