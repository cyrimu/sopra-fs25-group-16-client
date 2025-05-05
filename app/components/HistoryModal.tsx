"use client";
import React, { useEffect } from "react";
import { Modal, Popconfirm } from "antd";
import styles from "./HistoryModal.module.css";
import { DeleteOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteOldGame, selectOldGames, setOldGame } from "@/lib/features/old";

interface HistoryModalProps {
  visible: boolean;
  onClose: () => void;
}

const OLD_IDS_KEY = "OLD_IDS_KEY";

const HistoryModal: React.FC<HistoryModalProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch();

  const oldGames = useSelector(selectOldGames);

  // Initial load of the stored old games
  useEffect(() => {
    const oldIds = fetchOldIds();

    oldIds?.forEach((id) => {
      const oldGameString = localStorage.getItem(id);
      if (oldGameString) {
        const oldGame = JSON.parse(oldGameString);
        dispatch(setOldGame(oldGame));
      }
    });
  }, []);

  function fetchOldIds() {
    return localStorage.getItem(OLD_IDS_KEY)?.split(",") ?? [];
  }

  function setOldIds(filteredOldIds: string[]) {
    const uniqueIds = Array.from(new Set(filteredOldIds));
    localStorage.setItem(OLD_IDS_KEY, uniqueIds.join(","));
  }

  function handleDeleteLobby(gameID: string) {
    const oldIds = fetchOldIds();
    const filteredOldIds = oldIds?.filter((i) => i !== gameID);
    // Remove the id from the oldIds
    setOldIds(filteredOldIds);
    // Remove the game from the local storage
    localStorage.removeItem(gameID);
    // Dispatch the delete action
    dispatch(deleteOldGame(gameID));
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
          {oldGames?.map(({ gameID, players, type, language }, index) => {
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
                      onConfirm={() => handleDeleteLobby(gameID)}
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
          })}
        </tbody>
      </table>
    </Modal>
  );
};

export default HistoryModal;
