"use client";

import { restartGame, selectGameId } from "@/lib/features/game";
import { selectLobbyId, restartCurrentGame } from "@/lib/features/lobby";
import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectIsHost } from "../../../../../utils/helpers";

function Looser() {
  const router = useRouter();

  const dispatch = useDispatch();

  const lobbyId = useSelector(selectLobbyId);
  const gameId = useSelector(selectGameId);

  const isHost = useSelector(selectIsHost);

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

export default Looser;
