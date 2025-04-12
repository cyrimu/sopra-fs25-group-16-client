import { BOARD_SIZE, BLUE_CARDS, RED_CARDS, BLACK_CARDS } from "@/constants";
import { Card } from "./card.types";

export type Board = {
  boardSize: number;
  blueCards: number;
  redCards: number;
  blackCards: number;
  cards: Card[];
};

export const boardInitialState = {
  boardSize: BOARD_SIZE,
  blueCards: BLUE_CARDS,
  redCards: RED_CARDS,
  blackCards: BLACK_CARDS,
  cards: [],
} satisfies Board as Board;
