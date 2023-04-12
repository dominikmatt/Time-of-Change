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

    public connect(token: string): Promise<string> {
        return new Promise((resolve) => {
            console.info(`ToC:  Connected to game-server. ${config.get('connection').ws}`);
            this._socket = io(config.get('connection').ws, {
                secure: config.get('connection').ssl,
                transports: ['websocket'],
                query: {
                    token: token
                },
            });

            // @ts-ignore
            this._socket.on("error", (error) => {
                console.log(error)
            });

            // @ts-ignore
            this._socket.on("connect_error", (error) => {
                console.log(error)
            });

            // @ts-ignore
            this._socket.on("connect_timeout", (error) => {
                console.log(error)
            });

            // @ts-ignore
            this._socket.on("connecting", (error) => {
                console.log(error)
            });

            // @ts-ignore
            this._socket.on('connect', (args) => {
                console.log('connected');

                resolve(args)
            });
        });
    }

    get socket(): SocketIOClient.Socket {
        return this._socket;
    }
}

const connectionService = ConnectionService.getInstance();

export default connectionService;
