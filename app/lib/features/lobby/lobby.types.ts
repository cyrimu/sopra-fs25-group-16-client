import { GAME_TYPE } from "../game/game.types";
import { Player } from "../player/player.types";
import { LANGUAGES } from "./languages.types";

export interface Lobby {
  host: string;
  language: LANGUAGES;
  gameType: GAME_TYPE;
  lobbyID: string;
  players: Player[];
  playerCount: number;
}
