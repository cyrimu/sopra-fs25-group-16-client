"use client";
import "@ant-design/v5-patch-for-react-19";
import styles from "@/styles/game.module.css";
import LogButton from "@/components/logButton";
import GameCard from "@/components/gameCard";
import { useState } from "react";
import LogDialog from "@/components/logDialog";
import { useSelector } from "react-redux";
import { selectCards } from "@/lib/features/game";
import SubmitButton from "@/components/submitButton";

export default function Game() {
  const [isLog, setIsLog] = useState(false);

  const cards = useSelector(selectCards);

  return (
    <div className={styles.centered}>
      <div style={{ background: "#A79C8B", width: "100%", height: "100%" }}>
        {!isLog && <LogButton callback={() => setIsLog(true)} />}
        {isLog && <LogDialog callback={() => setIsLog(false)} />}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className={styles.gameWrapper}>
            <div className={styles.gameContainer}>
              {cards.map((e, i) => {
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
          <SubmitButton />
          <div className={styles.scoreboardWrapper}>
            <div
              className={styles.scoreboardContainer}
              style={{ backgroundColor: "#651C25", paddingRight: "150px" }}
            >
              <div className={styles.scoreboardContent}>
                <div className={styles.scoreboardTeamContainer}>
                  <span>Operatives</span>
                  <div className={styles.scoreboardPlayersContainer}>
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div className={styles.scoreboardPlayer} key={i}>
                        <span>Player {i + 1}</span>
                        <span>0</span>
                      </div>
                    ))}
                  </div>
                  <span>Spymaster</span>
                  <div className={styles.scoreboardPlayersContainer}>
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div className={styles.scoreboardPlayer} key={i}>
                        <span>Player {i + 1}</span>
                        <span>0</span>
                      </div>
                    ))}
                  </div>
                </div>
                <span className={styles.scoreboardScore}>8</span>
              </div>
            </div>
            <div
              className={styles.scoreboardContainer}
              style={{
                backgroundColor: "#294C61",
                paddingLeft: "150px",
              }}
            >
              <div className={styles.scoreboardContent}>
                <span className={styles.scoreboardScore}>8</span>
                <div className={styles.scoreboardTeamContainer}>
                  <span>Operatives</span>
                  <div className={styles.scoreboardPlayersContainer}>
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div className={styles.scoreboardPlayer} key={i}>
                        <span>Player {i + 1}</span>
                        <span>0</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
