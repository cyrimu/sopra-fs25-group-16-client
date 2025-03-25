import { Game, GAME_TYPE } from "../game/game.types";
import { Player } from "../player/player.types";
import { LANGUAGES } from "./languages.types";
import { Team } from "./team.types";

export interface Lobby {
  lobbyId: string | undefined;
  host: string | undefined;
  players: Player[];
  game: Game | undefined;
  type: GAME_TYPE;
  language: LANGUAGES;
  blueTeam: Team | undefined;
  redTeam: Team | undefined;
  connections: number;
}
