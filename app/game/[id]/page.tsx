"use client";
import "@ant-design/v5-patch-for-react-19";
import { useGameSaved } from "@/hooks/game/useGameSaved";
import { useGameWinner } from "@/hooks/game/useGameWinner";
import { ActionElement } from "@/components/ActionElement";
import { ClueDispaly } from "@/components/ClueDisplay";
import { useGameStarting } from "@/context/GameStartingContext";
import { selectIsHostInGame } from "../../../utils/helpers";
import LogButton from "@/components/buttons/LogButton";
import SaveButton from "@/components/buttons/SaveButton";
import GameLoading from "@/components/GameLoading";
import Scoreboard from "@/components/Scoreboard";
import styles from "@/styles/game.module.css";
import { useSelector } from "react-redux";
import Board from "@/components/Board";

export default function Game() {
  const isHost = useSelector(selectIsHostInGame);
  const { gameStarting } = useGameStarting();

  // Listen until a team wins and redirects to its correspondent screen
  useGameWinner();

  // Handle case when host saves the game
  useGameSaved();

  if (gameStarting) return <GameLoading />;

  return (
    <div className={styles.centered}>
      <div className={styles.gameBackground}>
        <div className={styles.gameLogController}>
          <LogButton />
        </div>
        {isHost && (
          <div className={styles.gameSaveController}>
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
