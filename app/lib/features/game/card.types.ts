import { GAME_TYPE } from "./game.types";

export interface Card {
  type: GAME_TYPE;
  content: string;
  isRevealed: boolean;
  color: CARD_COLOR;
}

export enum CARD_COLOR {
  blue,
  red,
  grey,
  black,
}
