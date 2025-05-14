"use client";
import React, { useEffect } from "react";
import { Modal, Popconfirm } from "antd";
import styles from "./HistoryModal.module.css";
import { DeleteOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteOldGame, selectOldGames, setOldGame } from "@/lib/features/old";
import { selectPlayers } from "@/lib/features/lobby";
import { isProduction } from "../../utils/environment";
import { selectPlayerName } from "@/lib/features/player";

interface HistoryModalProps {
  visible: boolean;
  onClose: () => void;
}

const OLD_IDS_KEY = "OLD_IDS_KEY";
const production = isProduction();

const HistoryModal: React.FC<HistoryModalProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch();

  let oldGames = useSelector(selectOldGames);

  const playerName = useSelector(selectPlayerName);

  // Select the players from the lobby
  const players = useSelector(selectPlayers);

  // Get distinct old games
  oldGames = Array.from(
    new Map(oldGames.map((game) => [game.gameID, game])).values()
  );

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
  }, [dispatch]);

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

  function handleStartOldGame(gameID: string) {
    const oldGame = oldGames.find((e) => e.gameID === gameID);
    if (!oldGame) throw new Error("The old game is not there");
    // Check whether the old players match the ones inside the lobby
    let playersMatch = true;
    oldGame.players.forEach((player) => {
      if (!players?.includes(player)) playersMatch = false;
    });

    if (!playersMatch && production)
      throw new Error("Ensure that you resume the game with the same players");

    // Send the old gameId via websockets
    dispatch({
      type: "lobby/oldGame",
      payload: { gameId: gameID, username: playerName },
    });
  }

  if (oldGames.length === 0) {
    return (
      <Modal
        title={"Old Games"}
        open={visible}
        onCancel={onClose}
        footer={null}
      >
        <p>
          Unfortunately there are no saved games. After saving a game, you will
          find it here
        </p>
      </Modal>
    );
  }

  return (
    <Modal title={"Old Games"} open={visible} onCancel={onClose} footer={null} width={'1000px'} height={'2000px'}>
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
                      cancelButtonProps={{ style: { backgroundColor: "#2f2f2f", color: "white", border: "1px solid #2f2f2f" } }}
                      okButtonProps={{ style: { backgroundColor: "white", color: "black", border: "1px solid black" } }}
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
                      onConfirm={() => handleStartOldGame(gameID)}
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
