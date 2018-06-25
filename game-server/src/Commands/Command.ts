import {CommandInterface, RequestInterface} from "./CommandInterface";
import Player from "../Player";

/**
 * This is the base Command and has implemented a default command setup.
 *
 * To create a new Command do following:
 *  - Create a new class like the BuildBuildingCommand and extend it from this class.
 *  - Add a getCommand method and return your command-name as a string.
 *  - Initialize your command in the Player-class.
 *  - Do some nice stuff on the execute-method.
 */
export default class Command implements CommandInterface {
    protected player: Player;

    constructor(player: Player) {
        this.player = player;

        this.bind();
    }

    /**
     * Binds the command.
     */
    bind() {
        this.player.wsSocket.on(this.getCommand(), this.execute.bind(this));
    }

    /**
     * Returns command-name as a string.
     *
     * @return {string}
     */
    protected getCommand (): string {
        throw new Error('Command: Add getCommand and return your command-name as a string.')
    }

    /**
     * Execute called command.
     *
     * @param {RequestInterface} req
     */
    execute(req: RequestInterface) {
        throw new Error(`Command: execute-method is not implemented on the "${this.getCommand()}" command.`)
    }
}
