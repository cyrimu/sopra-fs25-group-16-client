"use client";
import { restartGame, selectWinner } from "@/lib/features/game";
import { selectMyPlayerInGame } from "../../../utils/helpers";
import { TEAM_COLOR } from "@/lib/features/game/team.types";
import { useDispatch, useSelector } from "react-redux";
import ResultsTable from "@/components/resultsTable";
import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/lib/store";
import { useEffect, useState } from "react";
import { WIN_KEY } from "@/lib/features/game/game.types";
import { useErrorModal } from "@/context/ErrorModalContext";
import { useGamePersist } from "@/hooks/game/useGamePersist";
import { cleanGameLocalStorage } from "@/hooks/game/useGameWsConnect";
import { LOBBY_KEY } from "@/lib/features/lobby/lobby.types";

function Results() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { showError } = useErrorModal();

  const winner = useSelector(selectWinner);
  const myPlayer = useSelector(selectMyPlayerInGame);

  const isWinner = myPlayer?.team === winner;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const [lobbyId, setLobbyId] = useState<string | null>();

  // Fetch again the game when the user refreshes
  useGamePersist();

  useEffect(() => {
    // At first reload try to fetch the lobby id
    setLobbyId(localStorage.getItem(WIN_KEY));
  }, []);

  function handleHomePage() {
    // Reinitialize the game
    dispatch(restartGame());
    // Clean the persisten game from the local storage
    // cleanGameLocalStorage(localStorage);
    router.replace("/");
  }

  function handleBackToLobby() {
    if (!lobbyId) {
      showError("Something went wrong. We cannot retrieve the lobby id");
      return;
    }
    // Reinitialize the game
    dispatch(restartGame());
    // Restore the lobby id inside the preferences for the persistance
    localStorage.setItem(LOBBY_KEY, lobbyId);
    // Clean the persisten game from the local storage
    cleanGameLocalStorage(localStorage);
    router.replace(`/lobby/${lobbyId}`);
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
        <div className={styles.messageField}>
          <p className={styles.resultsMessage}>
            {isWinner
              ? "Congrats, no one can outspy you!"
              : "Better luck next time..."}
          </p>
        </div>

        <div className={styles.regularButtonContainer}>
          <button className={styles.regularButton} onClick={handleHomePage}>
            Home Page
          </button>
          <button className={styles.regularButton} onClick={handleBackToLobby}>
            Back to Lobby
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
