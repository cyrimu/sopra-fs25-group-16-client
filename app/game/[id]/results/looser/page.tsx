"use client";

import { restartGame, selectGameId, setGame } from "@/lib/features/game";
import {
  selectLobbyId,
  selectHost,
  restartCurrentGame,
} from "@/lib/features/lobby";
import { selectPlayerName } from "@/lib/features/player";
import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function Lobby() {
  const router = useRouter();

  const dispatch = useDispatch();

  const lobbyId = useSelector(selectLobbyId);
  const gameId = useSelector(selectGameId);

  const playerName = useSelector(selectPlayerName);
  const hostName = useSelector(selectHost);
  const isHost = playerName === hostName;

  function handleExitLobby() {
    dispatch(restartGame());
    dispatch(restartCurrentGame());
    router.push(`/lobby/${lobbyId}`);
  }

  return (
    <div className={styles.centered}>
      <div className={styles.messageContainer}>
        <div
          className={styles.resultsMessage}
          style={{ fontSize: "100px", textAlign: "center", minWidth: "900px" }}
        >
          Better luck next time...
        </div>

        {isHost ? (
          <>
            <div className={styles.regularButtonContainer}>
              <button
                className={styles.regularButton}
                onClick={() => router.push(`/lobby/${lobbyId}`)}
              >
                Play Again
              </button>
              <button
                className={styles.regularButton}
                onClick={() => router.push(`/lobby/${lobbyId}`)}
              >
                Return to Lobby
              </button>
              <button
                className={styles.regularButton}
                onClick={() => router.push(`/game/${gameId}/results`)}
              >
                View Results
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              className={styles.lobbyTitle}
              style={{ fontSize: "30px", textAlign: "center" }}
            >
              Wait for the host to restart the game...
              <br />
              or
            </div>
            <div className={styles.regularButtonContainer}>
              <button
                className={styles.regularButton}
                onClick={handleExitLobby}
              >
                Exit Lobby
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
