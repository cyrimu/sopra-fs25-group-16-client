"use client";

import GameCard from "@/components/gameCard";
import styles from "@/components/Board.module.css";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import { CARD_COLOR } from "@/lib/features/game/card.types";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPlayerName } from "@/lib/features/player";
import { setGame } from "@/lib/features/game";
import { TEAM_COLOR } from "@/lib/features/game/team.types";
import { LANGUAGES } from "@/lib/features/lobby/languages.types";

const dummyCards = Array.from({ length: 20 }, (_, i) => {
  let isRevealed = true;
  let color = CARD_COLOR.WHITE;

  if (i < 5) color = CARD_COLOR.BLUE;
  else if (i < 10) color = CARD_COLOR.RED;
  else if (i < 15) color = CARD_COLOR.BLACK;
  else isRevealed = false;

  return {
    id: i,
    type: GAME_TYPE.PICTURE,
    content: "",
    isRevealed,
    isSelected: false,
    image: "/test.jpg", // shown only if not revealed
    color,
  };
});

export default function ImageBoardTestPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlayerName("tester"));

    dispatch(
      setGame({
        gameID: "test-image",
        host: "tester",
        players: [
          {
            playerName: "tester",
            role: PLAYER_ROLES.BLUE_OPERATIVE,
            team: TEAM_COLOR.BLUE,
          },
        ],
        turn: PLAYER_ROLES.BLUE_OPERATIVE,
        saved: false,
        winner: null,
        remainingGuesses: 0,
        log: [],
        gameType: GAME_TYPE.PICTURE,
        language: LANGUAGES.ENGLISH,
        cards: dummyCards,
      })
    );
  }, [dispatch]);

  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>Image Board Test</h1>
      <div className={styles.boardWrapper}>
        <div className={styles.boardContainer}>
          <div className={styles.boardGrid}>
            {dummyCards.map((card) => (
              <GameCard key={card.id} card={card} selected={false} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}