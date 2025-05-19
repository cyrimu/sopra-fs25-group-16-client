import { GAME_TYPE } from "../game/game.types";
import { LANGUAGES } from "../lobby/languages.types";
import { Player } from "../player/player.types";

export interface Old {
  gameID: string;
  players: Player[];
  type: GAME_TYPE;
  language: LANGUAGES;
}

export const OLD_IDS_KEY = "OLD_IDS_KEY";
