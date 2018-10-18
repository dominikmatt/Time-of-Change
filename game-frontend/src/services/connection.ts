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
            this._socket = io('http://127.0.0.1:9100', {
<<<<<<< HEAD
                secure: true,
=======
                secure: false,
>>>>>>> 1e6b823b4346d2ce7e94a06c80152a6f5c414b65
                query: {
                    username: username,
                    token: `${username}-token`
                }
            });

            this._socket.on('connect', resolve);
        });
    }
w
    get socket(): SocketIOClient.Socket {
        return this._socket;
    }
}

const connectionService = ConnectionService.getInstance();

export default connectionService;
