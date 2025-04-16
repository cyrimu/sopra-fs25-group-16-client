import { LANGUAGES } from "../lobby/languages.types";
import { Player, PLAYER_ROLES } from "../player/player.types";
import { Card } from "./card.types";
import { TEAM_COLOR } from "./team.types";

export interface Game {
  gameID: number;
  host: string;
  players: Player[];
  cards: Card[];
  type: GAME_TYPE;
  language: LANGUAGES;
  turn: PLAYER_ROLES;
  remainingGuesses: number;
  winner: TEAM_COLOR | null;
  log: string[];
}

export enum GAME_TYPE {
  TEXT = "TEXT",
  PICTURE = "PICTURE",
}
