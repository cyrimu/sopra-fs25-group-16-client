import { GAME_TYPE } from "./game.types";

export interface Card {
  id: number;
  type: GAME_TYPE;
  content: string;
  isRevealed: boolean;
  isSelected: boolean;
  color: CARD_COLOR;
}

export enum CARD_COLOR {
  BLUE = "BLUE",
  RED = "RED",
  WHITE = "WHITE",
  BLACK = "BLACK",
}
