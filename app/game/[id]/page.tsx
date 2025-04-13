"use client";
import "@ant-design/v5-patch-for-react-19";
import LogButton from "@/components/buttons/LogButton";
import GameSubmit from "@/components/buttons/GameSubmit";
import Scoreboard from "@/components/Scoreboard";
import styles from "@/styles/game.module.css";
import LogDialog from "@/components/LogDialog";
import Board from "@/components/Board";
import { useState } from "react";

export default function Game() {
  const [isLog, setIsLog] = useState(false);

  return (
    <div className={styles.centered}>
      <div className={styles.gameBackground}>
        {!isLog && <LogButton callback={() => setIsLog(true)} />}
        {isLog && <LogDialog callback={() => setIsLog(false)} />}
        <div className={styles.gameContainer}>
          <Board />
          <GameSubmit />
          <Scoreboard />
        </div>
      </div>
    </div>
  );
}
//test
