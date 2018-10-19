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
            console.info('ToC: Connected to game-server. https://tocgs-01.time-of-changes.com');
            this._socket = io('https://tocgs-01.time-of-changes.com', {
                secure: true,
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
