"use client";
import "@ant-design/v5-patch-for-react-19";
import LogButton from "@/components/buttons/LogButton";
import Scoreboard from "@/components/Scoreboard";
import styles from "@/styles/game.module.css";
import Board from "@/components/Board";
import { useSelector } from "react-redux";
import { selectIsHostInGame } from "../../../utils/helpers";
import SaveButton from "@/components/buttons/SaveButton";
import { useGameStarting } from "@/context/GameStartingContext";
import GetReady from "@/components/getReady";
import { useGameSaved } from "@/hooks/game/useGameSaved";
import { useGameWinner } from "@/hooks/game/useGameWinner";
import { ActionElement } from "@/components/ActionElement";
import { ClueDispaly } from "@/components/ClueDisplay";
import { useGamePersist } from "@/hooks/game/useGamePersist";
import { selectGameStatus } from "@/lib/features/game";

export default function Game() {
  const { gameStarting } = useGameStarting();
  const isHost = useSelector(selectIsHostInGame);
  const gameStatus = useSelector(selectGameStatus);

  // Listen until a team wins and redirects to its corresponent screen
  useGameWinner();

  // Handle case when host saves the game
  useGameSaved();

  // Fetch again the game when the user refreshes
  useGamePersist();

  if (gameStarting) return <GetReady />;

  if (gameStatus === "idle")
    // Handle the state when the user refreshes the game screen
    return (
      <div className={styles.centered}>
        <div className={styles.gameBackground}></div>
      </div>
    );

  return (
    <div className={styles.centered}>
      <div className={styles.gameBackground}>
        {!isHost && (
        <div className={styles.gameLogController}>
          <LogButton />
        </div>
        )}
        {isHost && (
          <div className={styles.gameLogController}>
            <LogButton />
            <SaveButton />
          </div>
        )}
        <div className={styles.gameContainer}>
          <Board />
          <ClueDispaly />

          <ActionElement />
          <Scoreboard />
        </div>
      </div>
    </div>
  );
}
