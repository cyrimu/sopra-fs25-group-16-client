"use client";
import { selectWinner } from "@/lib/features/game";
import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectMyPlayerInGame } from "../../../utils/helpers";
import { TEAM_COLOR } from "@/lib/features/game/team.types";
import { useState } from "react";
import ResultsTable from "@/components/resultsTable";

function Results() {
  const router = useRouter();

  const winner = useSelector(selectWinner);
  const myPlayer = useSelector(selectMyPlayerInGame);

  const isWinner = myPlayer?.team === winner;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  function handleExitHome() {
    router.replace("/");
  }

  return (
    <div className={styles.centered}>
      {isWinner && winner === TEAM_COLOR.BLUE && (
        <div className={styles.blueOverlay} />
      )}
      {isWinner && winner === TEAM_COLOR.RED && (
        <div className={styles.redOverlay} />
      )}
      <ResultsTable visible={isModalVisible} onClose={hideModal} />
      <div className={styles.messageContainer}>
        {isWinner ? (
          <div className={styles.resultsMessage}>
            Congrats no one can outspy you!
          </div>
        ) : (
          <div className={styles.resultsMessage}>Better luck next time...</div>
        )}

        <div className={styles.regularButtonContainer}>
          <button className={styles.regularButton} onClick={handleExitHome}>
            Go Home
          </button>
          <button className={styles.regularButton} onClick={showModal}>
            View Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
