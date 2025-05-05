"use client";
import React from "react";
import { Modal, Popconfirm } from "antd";
import { Player, PLAYER_ROLES } from "@/lib/features/player/player.types";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import { LANGUAGES } from "@/lib/features/lobby/languages.types";
import { TEAM_COLOR } from "@/lib/features/game/team.types";
import styles from "./HistoryModal.module.css";
import { DeleteOutlined, PlayCircleOutlined } from "@ant-design/icons";

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
  function handleDeleteLobby() {
    throw new Error("Function not implemented.");
  }

  function handleStartOldGame() {
    throw new Error("Function not implemented.");
  }

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
            <th>language</th>
            <th>delete</th>
            <th>play</th>
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
                  <td>
                    {
                      <Popconfirm
                        title={
                          <span style={{ color: "black" }}>
                            Are you sure if you want to delete the game?
                          </span>
                        }
                        onConfirm={handleDeleteLobby}
                        okText="Yes"
                        cancelText="No"
                        icon={false}
                      >
                        <DeleteOutlined />
                      </Popconfirm>
                    }
                  </td>
                  <td>
                    {
                      <Popconfirm
                        title={
                          <span style={{ color: "black" }}>
                            Are you sure if you want to resume this game?
                          </span>
                        }
                        onConfirm={handleStartOldGame}
                        okText="Yes"
                        cancelText="No"
                        icon={false}
                      >
                        <PlayCircleOutlined />
                      </Popconfirm>
                    }
                  </td>
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
