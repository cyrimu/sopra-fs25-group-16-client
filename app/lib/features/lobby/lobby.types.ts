import { Game, GAME_TYPE } from "../game/game.types";
import { Player } from "../player/player.types";
import { LANGUAGES } from "./languages.types";

export interface Lobby {
  host: string | undefined;
  language: LANGUAGES;
  gameType: GAME_TYPE;
  lobbyID: string | undefined;
  players: Player[];
  currentGame: Game | undefined;
  playerCount: number;
}
