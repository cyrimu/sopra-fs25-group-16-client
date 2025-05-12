import React from "react";
import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import { Popconfirm } from "antd";
import {selectGameId, selectPlayers, selectWinner} from "@/lib/features/game";
import { selectLobbyId } from "@/lib/features/lobby";
import { useSelector } from "react-redux";
import { selectIsHost } from "../../utils/helpers";

const ResultsTable: React.FC = () => {
  const router = useRouter();

    const winner = useSelector(selectWinner);
    console.log("winner", winner);
    const loser = winner === "RED" ? "blue" : "red";


    const lobbyId = useSelector(selectLobbyId);
  console.log("lobbyId", lobbyId);

  const gameId = useSelector(selectGameId);
    console.log("gameId", gameId);
  const isHost = useSelector(selectIsHost);

  const players = useSelector(selectPlayers);
    console.log("players", players);

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
          Winner: {winner}
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
          Loser: {loser}
        </div>
      </div>

      <table className={styles.tableField} style={{ minWidth: "600px" }}>
        <thead>
          <tr>
            <th>codename</th>
            <th>team</th>
            <th>points</th>
          </tr>
        </thead>
        <tbody>
          {players?.map(({ playerName, role, team }, i) => {
            const roleString = role?.split("_")[1];

            return (
              <tr key={i}>
                <td>{playerName}</td>
                <td>{team}</td>
                {roleString && (
                  <td>{`${roleString[0]} ${roleString.substring(1)}`}</td>
                )}
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
