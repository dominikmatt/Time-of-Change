import Player from "../Player";

export default interface MapStartupInterface {
    player: Player;
    placeHouses(): void;
}