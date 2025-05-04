import React from "react";
import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import { Popconfirm } from "antd";
import { selectPlayers, selectWinner } from "@/lib/features/game";
import { selectLobbyId, selectHost } from "@/lib/features/lobby";
import { selectPlayerName } from "@/lib/features/player";
import { useSelector, useDispatch } from "react-redux";
import { stringify } from "querystring";

const ResultsTable: React.FC = () => {
  const router = useRouter();

  const lobbyId = useSelector(selectLobbyId);
  // const gameId = useSelector(selectGameId);
  const capitalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  const playerName = useSelector(selectPlayerName);
  const hostName = useSelector(selectHost);
  const isHost = playerName === hostName;

  const players = useSelector(selectPlayers);
  const winner = useSelector(selectWinner);
  const winnerTeam = winner === "RED" ? "RED" : "BLUE";
  const loserTeam = winner === "RED" ? "BLUE" : "RED";

  

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
          Winners: {capitalize(winnerTeam)}
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
          Losers: {capitalize(loserTeam)}
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
            const roleString = role?.split("_")[1]; // "SPYMASTER" or "OPERATIVE"
            return (
              <tr key={i}>
                <td>{playerName}</td>
                <td>{capitalize(team)}</td>
                <td>{capitalize(roleString)}</td>
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