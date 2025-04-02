import { CARD_COLOR } from "./lib/features/game/card.types";
import { GAME_TYPE } from "./lib/features/game/game.types";

const colorCards = Array.from({ length: 16 }).map((e, i) => {
  return {
    type: GAME_TYPE.text,
    content: i % 2 === 0 ? "BLUE" : "RED",
    isRevealed: false,
    color: i % 2 === 0 ? CARD_COLOR.blue : CARD_COLOR.red,
  };
});

const greyCards = Array.from({ length: 8 }).map((e, i) => {
  return {
    type: GAME_TYPE.text,
    content: `GREY`,
    isRevealed: false,
    color: CARD_COLOR.grey,
  };
});

const blackCard = {
  type: GAME_TYPE.text,
  content: "BLACK",
  isRevealed: false,
  color: CARD_COLOR.black,
};

const cards = [...colorCards, ...greyCards, blackCard];
export const shuffledCards = cards.sort(() => Math.random() - 0.5);
