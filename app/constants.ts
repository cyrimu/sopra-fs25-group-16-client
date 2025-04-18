import { GAME_TYPE, TURN_ORDER } from "./lib/features/game/game.types";
import { LANGUAGES } from "./lib/features/lobby/languages.types";

// Board characteristics
export const BOARD_SIZE = 25;
export const BLUE_CARDS = 8;
export const RED_CARDS = 8;
export const BLACK_CARDS = 1;
// Default values
export const DEFAULT_LANGUAGE = LANGUAGES.english;
export const DEFAULT_GAME_TYPE = GAME_TYPE.TEXT;
export const DEFAULT_STARTING_TURN = TURN_ORDER.BLUE_OPERATIVE;
