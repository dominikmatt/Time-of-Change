import * as io from 'socket.io-client';

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
            console.info('ToC: Connected to game-server.')
            this._socket = io('http://127.0.0.1:9100', {
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
