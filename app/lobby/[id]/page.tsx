"use client";
import "@ant-design/v5-patch-for-react-19";
import { useSelector } from "react-redux";
import { selectPlayerName } from "@/lib/features/player";
import {
  selectGameType,
  selectHost,
  selectLanguage,
  selectLobbyId,
} from "@/lib/features/lobby";
import { LANGUAGES } from "@/lib/features/lobby/languages.types";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import { Player, PLAYER_ROLES } from "@/lib/features/player/player.types";
import { TEAM_COLOR } from "@/lib/features/lobby/team.types";
import styles from "@/styles/page.module.css";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown, MenuProps } from "antd";

export default function Lobby() {
  const router = useRouter();

  const id = useSelector(selectLobbyId);

  const playerName = useSelector(selectPlayerName);
  const hostName = useSelector(selectHost);
  const isHost = playerName === hostName;

  const [language, setLanguage] = useState(useSelector(selectLanguage));
  const [type, setType] = useState(useSelector(selectGameType));
  const [isEdit, setIsEdit] = useState(false);

  function handleDeleteLobby() {
    router.replace("/create");
  }

  function handleChangeSetup() {
    setIsEdit(!isEdit);
  }

  function handleStartGame() {
    router.push(`/game/${id}`);
  }

  // Setup mockup data
  const players: Player[] = [
    { playerName: "Sergi", team: TEAM_COLOR.red, role: PLAYER_ROLES.operative },
    { playerName: "Pio", team: TEAM_COLOR.red, role: PLAYER_ROLES.spymaster },
    {
      playerName: "Rashmi",
      team: TEAM_COLOR.blue,
      role: PLAYER_ROLES.spymaster,
    },
    {
      playerName: "Calvin",
      team: TEAM_COLOR.blue,
      role: PLAYER_ROLES.operative,
    },
    {
      playerName: "Cyril",
      team: TEAM_COLOR.blue,
      role: PLAYER_ROLES.operative,
    },
  ];

  const gameType = GAME_TYPE[type];
  const gameTypeStr = gameType.charAt(0).toUpperCase() + gameType.slice(1);
  const lang = LANGUAGES[language];
  const languageStr = lang.charAt(0).toUpperCase() + lang.slice(1);

  const handleGameType: MenuProps["onClick"] = (e) => {
    const newGameType = GAME_TYPE[e.key as keyof typeof GAME_TYPE];
    setType(newGameType);
  };

  const handleLanguage: MenuProps["onClick"] = (e) => {
    const newLanguage = LANGUAGES[e.key as keyof typeof LANGUAGES];
    setLanguage(newLanguage);
  };

  const gameTypeElements: MenuProps = {
    items: Object.values(GAME_TYPE).map((type) => ({
      key: type,
      label: (
        <div className={styles.lobbyDropdown}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
      ),
      onClick: handleGameType,
    })),
  };

  const languageElements: MenuProps = {
    items: Object.values(LANGUAGES).map((language) => ({
      key: language,
      label: (
        <div className={styles.lobbyDropdown}>
          {language.charAt(0).toUpperCase() + language.slice(1)}
        </div>
      ),
      onClick: handleLanguage,
    })),
  };

  return (
    <div className={styles.centered}>
      <div className={styles.redBlueOverlay}></div>
      <div className={styles.lobbyTitle}>Game Lobby</div>
      <div className={styles.messageContainer}>
        <div style={{ display: "flex", gap: "40px" }}>
          <div className={styles.lobbyConfig}>
            {isEdit && isHost ? (
              <Dropdown menu={gameTypeElements}>
                <div style={{ display: "flex" }}>
                  {`Mode: ${gameTypeStr}`} <DownOutlined />
                </div>
              </Dropdown>
            ) : (
              `Mode: ${gameTypeStr}`
            )}
          </div>
          <div className={styles.lobbyConfig}>
            {isEdit && isHost ? (
              <Dropdown menu={languageElements}>
                <div style={{ display: "flex" }}>
                  {`Language: ${languageStr}`} <DownOutlined />
                </div>
              </Dropdown>
            ) : (
              `Language: ${languageStr}`
            )}
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
            {players.map(({ playerName, team, role }, index) => (
              <tr key={index}>
                <td>{playerName}</td>
                <td>
                  {team
                    ? TEAM_COLOR[team].charAt(0).toUpperCase() +
                      TEAM_COLOR[team].slice(1)
                    : "N/A"}
                </td>
                <td>
                  {role
                    ? PLAYER_ROLES[role].charAt(0).toUpperCase() +
                      PLAYER_ROLES[role].slice(1)
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        {isHost && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <button
              className={styles.regularButton}
              onClick={handleChangeSetup}
            >
              {isEdit ? "Save Setup" : "Change Setup"} <RightOutlined />
            </button>
            <button className={styles.regularButton} onClick={handleStartGame}>
              Start Game <RightOutlined />
            </button>
            <button
              className={styles.regularButton}
              onClick={handleDeleteLobby}
            >
              Delete Lobby <RightOutlined />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
