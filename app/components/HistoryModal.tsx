"use client";
import React from "react";
import { Modal } from "antd";
import { Player, PLAYER_ROLES } from "@/lib/features/player/player.types";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import { LANGUAGES } from "@/lib/features/lobby/languages.types";
import { TEAM_COLOR } from "@/lib/features/game/team.types";
import styles from "./HistoryModal.module.css";
import { DeleteOutlined } from "@ant-design/icons";

interface HistoryModalProps {
  visible: boolean;
  onClose: () => void;
}

interface OldGame {
  gameID: string;
  players: Player[];
  type: GAME_TYPE;
  language: LANGUAGES;
}

const oldGameExamples: OldGame[] = [
  {
    gameID: "1234",
    type: GAME_TYPE.TEXT,
    language: LANGUAGES.SPANISH,
    players: [
      {
        playerName: "Sergi",
        role: PLAYER_ROLES.BLUE_OPERATIVE,
        team: TEAM_COLOR.BLUE,
      },
      {
        playerName: "Joan",
        role: PLAYER_ROLES.RED_OPERATIVE,
        team: TEAM_COLOR.RED,
      },
      {
        playerName: "Pepe",
        role: PLAYER_ROLES.RED_SPYMASTER,
        team: TEAM_COLOR.RED,
      },
      {
        playerName: "Pepe",
        role: PLAYER_ROLES.RED_OPERATIVE,
        team: TEAM_COLOR.RED,
      },
    ],
  },
  {
    gameID: "4567",
    type: GAME_TYPE.TEXT,
    language: LANGUAGES.SPANISH,
    players: [
      {
        playerName: "Pepe",
        role: PLAYER_ROLES.BLUE_OPERATIVE,
        team: TEAM_COLOR.BLUE,
      },
      {
        playerName: "Robert",
        role: PLAYER_ROLES.RED_OPERATIVE,
        team: TEAM_COLOR.RED,
      },
      {
        playerName: "Laura",
        role: PLAYER_ROLES.RED_SPYMASTER,
        team: TEAM_COLOR.RED,
      },
      {
        playerName: "Marta",
        role: PLAYER_ROLES.RED_OPERATIVE,
        team: TEAM_COLOR.RED,
      },
    ],
  },
];

const HistoryModal: React.FC<HistoryModalProps> = ({ visible, onClose }) => {
  return (
    <Modal title={"Old Games"} open={visible} onCancel={onClose} footer={null}>
      <p>
        Select the old game you want to start. The players must be the same as
        in the lobby.
      </p>
      <br />
      <table className={styles.historyField}>
        <thead>
          <tr>
            <th>id</th>
            <th>players</th>
            <th>role</th>
            <th>ready</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {oldGameExamples?.map(
            ({ gameID, players, type, language }, index) => {
              const joinPlayers = players
                .map(({ playerName }) => playerName)
                .join(", ");

              return (
                <tr key={index}>
                  <td>{gameID}</td>
                  <td>{joinPlayers}</td>
                  <td>{type}</td>
                  <td>{language}</td>
                  <td>{<DeleteOutlined />}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Modal>
  );
};

export default HistoryModal;
