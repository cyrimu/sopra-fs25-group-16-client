"use client";
import "@ant-design/v5-patch-for-react-19";
import styles from "@/styles/game.module.css";
import LogButton from "@/components/logButton";
import GameCard from "@/components/gameCard";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import { CARD_COLOR } from "@/lib/features/game/card.types";

export default function Game() {
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
  const shuffledCards = cards.sort(() => Math.random() - 0.5);

  return (
    <div className={styles.centered}>
      <div style={{ background: "#A79C8B", width: "100%", height: "100%" }}>
        <LogButton />
        <div className={styles.gameWrapper}>
          <div className={styles.gameContainer}>
            {shuffledCards.map((e, i) => {
              return (
                <GameCard
                  key={i}
                  type={e.type}
                  content={e.content}
                  isRevealed={e.isRevealed}
                  color={e.color}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
