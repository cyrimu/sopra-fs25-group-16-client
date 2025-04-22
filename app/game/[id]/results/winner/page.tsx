"use client";

import { selectGameId, selectWinner } from "@/lib/features/game";
import { TEAM_COLOR } from "@/lib/features/game/team.types";
import { selectHost, selectLobbyId } from "@/lib/features/lobby";
import { selectPlayerName } from "@/lib/features/player";
import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Lobby() {
  const router = useRouter();

  const lobbyId = useSelector(selectLobbyId);
  const gameId = useSelector(selectGameId);

  const playerName = useSelector(selectPlayerName);
  const hostName = useSelector(selectHost);
  const isHost = playerName === hostName;

  const team = useSelector(selectWinner);

  return (
    <div className={styles.centered}>
      {team == TEAM_COLOR.BLUE && <div className={styles.blueOverlay} />}
      {team == TEAM_COLOR.RED && <div className={styles.redOverlay} />}

      <div className={styles.messageContainer}>
        <div
          className={styles.resultsMessage}
          style={{ fontSize: "100px", textAlign: "center", minWidth: "900px" }}
        >
          Congrats no one can outspy you!
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
                onClick={() => router.push(`/lobby/${lobbyId}`)}
              >
                Exit Lobby
              </button>
            </div>
          </>
        )}
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
              onClick={() => router.push(`/lobby/${lobbyId}`)}
            >
              Exit Lobby
            </button>
          </div>
        </>
      )}
    </div>
  );
}
