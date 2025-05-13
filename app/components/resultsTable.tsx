import React from "react";
import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import { Popconfirm } from "antd";
import {
  selectGameId,
  selectPlayers,
  selectWinner
} from "@/lib/features/game";
import { selectLobbyId} from "@/lib/features/lobby";
import { selectIsHost } from "../../utils/helpers";
import { selectPlayerName } from "@/lib/features/player";
import { useSelector } from "react-redux";

const ResultsTable: React.FC = () => {
  const router = useRouter();

  const winner = useSelector(selectWinner);
  const loser = winner === "RED" ? "BLUE" : "RED";
  const winnerTeam = winner === "RED" ? "RED" : "BLUE";
  const loserTeam = winner === "RED" ? "BLUE" : "RED";

  const lobbyId = useSelector(selectLobbyId);
  const gameId = useSelector(selectGameId);

  const playerName = useSelector(selectPlayerName);
  const isHost = useSelector(selectIsHost);

  const players = useSelector(selectPlayers);

  const capitalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  const confirmDeleteLobby = () => {
    router.replace("/create");
  };

  const cancelDeleteLobby = () => {
    // Do nothing
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          marginBottom: "30px",
        }}
      >
        <div
          className={styles.messageField}
          style={{
            width: "100%",
            padding: "30px",
            height: "auto",
            fontSize: "26px",
            textAlign: "center",
            marginRight: "30px",
          }}
        >
          Winner: {capitalize(winnerTeam)}
        </div>
        <div
          className={styles.messageField}
          style={{
            width: "100%",
            padding: "30px",
            height: "auto",
            fontSize: "26px",
            textAlign: "center",
          }}
        >
          Loser: {capitalize(loserTeam)}
        </div>
      </div>

      <table className={styles.tableField} style={{ minWidth: "600px" }}>
        <thead>
          <tr>
            <th>codename</th>
            <th>team</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
          {players
            ?.slice()
            .sort((a, b) => {
              if (a.team === winner && b.team !== winner) return -1;
              if (a.team !== winner && b.team === winner) return 1;
              return 0;
            })
            .map(({ playerName, team, role }, i) => {
              const roleString = role?.split("_")[1];
              return (
                <tr key={i}>
                  <td>{playerName}</td>
                  <td>{capitalize(team ?? "")}</td>
                  <td>{capitalize(roleString ?? "")}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className={styles.regularButtonContainer}>
        {isHost ? (
          <>
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
            <Popconfirm
              title={
                <span style={{ color: "black" }}>
                  Are you sure if you want to delete the lobby?
                </span>
              }
              onConfirm={confirmDeleteLobby}
              onCancel={cancelDeleteLobby}
              okText="Yes"
              cancelText="No"
              icon={false}
            >
              <button className={styles.regularButton}>Delete Lobby</button>
            </Popconfirm>
          </>
        ) : (
          <>
            <button
              className={styles.regularButton}
              onClick={() => router.push(`/lobby/${lobbyId}`)}
            >
              Exit Lobby
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ResultsTable;
