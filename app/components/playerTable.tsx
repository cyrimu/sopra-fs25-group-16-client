import React from "react";
import styles from "@/styles/page.module.css";
import { useSelector } from "react-redux";
import {
  selectGameType,
  selectPlayers,
  selectPlayersReady,
} from "@/lib/features/lobby";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import { PlayerReadyStatus } from "./PlayerReady";
import { selectPlayerName } from "@/lib/features/player";

const PlayerTable: React.FC = () => {
  const gameType = useSelector(selectGameType);
  const players = useSelector(selectPlayers);
  const username = useSelector(selectPlayerName);
  const playersReady = useSelector(selectPlayersReady);

  function isReady(playerName: string): boolean {
    return playersReady?.some((e) => e === playerName) ?? false;
  }

  return (
    <>
<div
    style={{
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  }}
>
  <div
    className={styles.messageField}
    style={{
      width: "50%",
      padding: "30px",
      height: "auto",
      fontSize: "20px",
    }}
  >
    Mode: {gameType === GAME_TYPE.TEXT ? "Word" : "Picture"}
  </div>
  <div
    className={styles.messageField}
    style={{
      width: "50%",
      padding: "30px",
      height: "auto",
      fontSize: "20px",
    }}
  >
    Lobby ID: {window.location.href.split("/").pop()}
  </div>
</div>
      <br />
      <table className={styles.tableField}>
        <thead>
          <tr>
            <th>codename</th>
            <th>team</th>
            <th>role</th>
            <th>ready</th>
          </tr>
        </thead>
        <tbody>
          {players
            ?.filter((p) => p)
            ?.map(({ playerName, team, role }, index) => {
              const roleSplit = role?.split("_")[1];

              const teamString =
                team?.toString()[0] +
                " " +
                team?.toString().substring(1).toLowerCase();

              const roleString =
                roleSplit?.toString()[0] +
                "" +
                roleSplit?.toString().substring(1).toLowerCase();

              return (
                <tr key={index}>
                  <td>{playerName}</td>
                  <td>{team ? teamString : "N/A"}</td>
                  <td>{role ? roleString : "N/A"}</td>
                  <td>
                    <PlayerReadyStatus
                      isReady={isReady(playerName)}
                      isSelf={playerName == username}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default PlayerTable;
