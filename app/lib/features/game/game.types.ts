import { LANGUAGES } from "../lobby/languages.types";
import { Team, TEAM_COLOR } from "../lobby/team.types";
import { Player } from "../player/player.types";
import { Board } from "./board.types";

export interface Game {
  gameID: string | undefined;
  host: string | undefined;
  players: Player[];
  blueTeam: Team | undefined;
  redTeam: Team | undefined;
  board: Board;
  type: GAME_TYPE;
  language: LANGUAGES;
  turn: TURN_ORDER;
  remainingGuesses: number | undefined;
  winner: TEAM_COLOR | undefined;
  mvp: Player | undefined;
  log: string[];
}

export enum TURN_ORDER {
  BLUE_SPYMASTER,
  BLUE_OPERATIVE,
  RED_SPYMASTER,
  RED_OPERATIVE,
}

export enum GAME_TYPE {
  text = "text",
  image = "image",
}
