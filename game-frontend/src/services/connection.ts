import * as io from 'socket.io-client';
import config from "../configuration/config";

let instance: ConnectionService;

class ConnectionService {
    private _socket: SocketIOClient.Socket;

    public static getInstance(): ConnectionService {
        if (!instance) {
            instance = new ConnectionService();
        }

        return instance;
    }

    public connect(username: string): Promise<string> {
        return new Promise((resolve) => {
            console.info(`ToC: Connected to game-server. ${config.get('connection').ws}`);
            this._socket = io(config.get('connection').ws, {
                secure: config.get('connection').ssl,
                query: {
                    username: username,
                    token: `${username}-token`
                }
            });

            this._socket.on('connect', resolve);
        });
    }

    get socket(): SocketIOClient.Socket {
        return this._socket;
    }
}

const connectionService = ConnectionService.getInstance();

export default connectionService;
