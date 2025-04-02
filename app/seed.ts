import { CARD_COLOR } from "./lib/features/game/card.types";
import { GAME_TYPE } from "./lib/features/game/game.types";
import { TEAM_COLOR } from "./lib/features/lobby/team.types";
import { Player, PLAYER_ROLES } from "./lib/features/player/player.types";

const colorCards = Array.from({ length: 16 }).map((_, i) => {
  return {
    type: GAME_TYPE.text,
    content: i % 2 === 0 ? "BLUE" : "RED",
    isRevealed: false,
    color: i % 2 === 0 ? CARD_COLOR.blue : CARD_COLOR.red,
  };
});

const greyCards = Array.from({ length: 8 }).map(() => {
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

export const players: Player[] = [
  { playerName: "Sergi", team: TEAM_COLOR.red, role: PLAYER_ROLES.operative },
  { playerName: "Pio", team: TEAM_COLOR.red, role: PLAYER_ROLES.spymaster },
  {
    playerName: "Rashmi",
    team: TEAM_COLOR.blue,
    role: PLAYER_ROLES.spymaster,
  },
  {
    playerName: "Calvin",
    team: TEAM_COLOR.blue,
    role: PLAYER_ROLES.operative,
  },
  {
    playerName: "Cyril",
    team: TEAM_COLOR.blue,
    role: PLAYER_ROLES.operative,
  },
];
