import React, { useState } from "react";
import styles from "@/styles/page.module.css";
import { useSelector } from "react-redux";
import {
  selectGameType,
  selectLobbyId,
  selectPlayers,
} from "@/lib/features/lobby";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import { CopyOutlined, CopyFilled } from "@ant-design/icons";

const PlayerTable: React.FC = () => {
  const gameType = useSelector(selectGameType);
  const players = useSelector(selectPlayers);
  const lobbyId = useSelector(selectLobbyId);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <div
          className={styles.messageField}
          style={{
            width: "50%",
            padding: "30px",
            fontSize: "20px",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            userSelect: "none",
          }}
        >
          <span style={{ display: "flex", gap: "8px", fontSize: "20px" }}>
            <span>Mode:</span>
            <span>{gameType === GAME_TYPE.TEXT ? "Word" : "Picture"}</span>
          </span>
        </div>

        <div
          className={styles.messageField}
          style={{
            width: "50%",
            padding: "30px",
            fontSize: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            userSelect: "none",
          }}
        >
          <span>Lobby ID:</span>
          <span
            onClick={() => {
              navigator.clipboard.writeText(lobbyId ?? "");
              const el = document.getElementById("lobby-id");
              if (el) {
                el.style.opacity = "0.4";
                setTimeout(() => (el.style.opacity = "1"), 150);
              }
              setIsClicked(true);
              setTimeout(() => setIsClicked(false), 150);
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsClicked(false);
            }}
            title="Click to copy"
            id="lobby-id"
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              borderRadius: "4px",
              transition: "background-color 0.15s ease",
              fontSize: "20px",
              color: isClicked ? "#666" : isHovered ? "#888" : "white",
            }}
          >
            <span>{lobbyId}</span>
            <span
              style={{
                position: "relative",
                top: "-2px",
                display: "inline-flex",
                alignItems: "center",
                height: "20px",
              }}
            >
              {isHovered || isClicked ? (
                <CopyFilled style={{ fontSize: "20px" }} />
              ) : (
                <CopyOutlined style={{ fontSize: "20px" }} />
              )}
            </span>
          </span>
        </div>
      </div>

      <br />

      <table className={styles.tableField}>
        <thead>
          <tr>
            <th>codename</th>
            <th>team</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
          {players
            ?.filter((p) => p)
            ?.map(({ playerName, team, role }, index) => {
              const roleSplit = role?.split("_")[1];

              const teamString = `${team?.toString()[0]}${team
                ?.toString()
                .substring(1)
                .toLowerCase()}`;

              const roleString = `${roleSplit?.toString()[0]}${roleSplit
                ?.toString()
                .substring(1)
                .toLowerCase()}`;

              return (
                <tr key={index}>
                  <td>{playerName}</td>
                  <td>{team ? teamString : "N/A"}</td>
                  <td>{role ? roleString : "N/A"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default PlayerTable;