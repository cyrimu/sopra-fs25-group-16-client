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
}
