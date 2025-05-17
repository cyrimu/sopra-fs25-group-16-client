import { LANGUAGES } from "../lobby/languages.types";
import { Player, PLAYER_ROLES } from "../player/player.types";
import { Card } from "./card.types";
import { TEAM_COLOR } from "./team.types";

export interface Game {
  gameID: string;
  host: string;
  players: Player[];
  cards: Card[];
  gameType: GAME_TYPE;
  language: LANGUAGES;
  turn: PLAYER_ROLES;
  remainingGuesses: number;
  winner: TEAM_COLOR | null;
  log: string[];
  saved: boolean | undefined;
}

export enum GAME_TYPE {
  TEXT = "TEXT",
  PICTURE = "PICTURE",
}

export enum TURN_ORDER {
  BLUE_OPERATIVE = "BLUE_OPERATIVE",
  RED_OPERATIVE = "RED_OPERATIVE",
}

export const GAME_KEY = "GAME_KEY";
export const WIN_KEY = "WIN_KEY";
