import React from "react";
import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import { Popconfirm } from "antd";

interface PlayerData {
  codename: string;
  team: string;
  points: number;
}

const ResultsTable: React.FC = () => {
  //temp data until web socket connection

  const router = useRouter();
  const isHost = true;
  const lobbyId = "abc123";

  const players: PlayerData[] = [
    { codename: "double0seven", team: "blue", points: 0 },
    { codename: "totallyspy", team: "blue", points: 5 },
    { codename: "kimpossible", team: "red", points: 4 },
    { codename: "karl", team: "red", points: 4 },
  ];
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
          Winner: Red
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
          Loser: Blue
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
          {players.map((player, index) => (
            <tr key={index}>
              <td>{player.codename}</td>
              <td>{player.team}</td>
              <td>{player.points}</td>
            </tr>
          ))}
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
