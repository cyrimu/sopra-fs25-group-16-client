"use client";
import "@ant-design/v5-patch-for-react-19";
import { useSelector } from "react-redux";
import { selectPlayerName } from "@/lib/features/player";
import {
  selectGameType,
  selectLanguage,
  selectLobbyId,
} from "@/lib/features/lobby";
import { LANGUAGES } from "@/lib/features/lobby/languages.types";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import { Player, PLAYER_ROLES } from "@/lib/features/player/player.types";
import { TEAM_COLOR } from "@/lib/features/lobby/team.types";
import styles from "@/styles/page.module.css";
import { RightOutlined } from "@ant-design/icons";

export default function Lobby() {
  // const lobbyId = useSelector(selectLobbyId);
  // const playerName = useSelector(selectPlayerName);
  // const language = useSelector(selectLanguage);
  // const type = useSelector(selectGameType);
  // return (
  //   <div style={{ color: "white" }}>
  //     <div>lobbyId: {lobbyId}</div>
  //     <div>playerName: {playerName}</div>
  //     <div>language: {LANGUAGES[language]}</div>
  //     <div>type: {GAME_TYPE[type]}</div>
  //   </div>
  // );

  // Setup mockup data
  const type = GAME_TYPE.text;
  const language = LANGUAGES.english;

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

  return (
    <div className={styles.centered}>
      <div className={styles.redBlueOverlay}></div>
      <div className={styles.lobbyTitle}>Game Lobby</div>
      <div className={styles.messageContainer}>
        <div style={{ display: "flex", gap: "40px" }}>
          <div className={styles.lobbyConfig}>Mode: {gameTypeStr}</div>
          <div className={styles.lobbyConfig}>Language: {languageStr}</div>
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <button className={styles.regularButton}>
            Change Setup <RightOutlined />
          </button>
          <button className={styles.regularButton}>
            Start Game <RightOutlined />
          </button>
          <button className={styles.regularButton}>
            Delete Lobby <RightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}
