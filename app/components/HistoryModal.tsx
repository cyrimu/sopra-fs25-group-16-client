"use client";
import React, { useEffect, useMemo } from "react";
import { Modal, Popconfirm } from "antd";
import styles from "./HistoryModal.module.css";
import { DeleteOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteOldGame, selectOldGames, setOldGame } from "@/lib/features/old";
import { selectPlayers } from "@/lib/features/lobby";
import { isProduction } from "../../utils/environment";
import { selectUsername } from "@/lib/features/player";
import { useErrorModal } from "@/context/ErrorModalContext";
import { OLD_IDS_KEY } from "@/lib/features/old/old.types";

interface HistoryModalProps {
  visible: boolean;
  onClose: () => void;
}

const production = isProduction();

const HistoryModal: React.FC<HistoryModalProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const { showError } = useErrorModal();

  const oldGames = useSelector(selectOldGames);
  const username = useSelector(selectUsername);
  // Select the players from the lobby
  const players = useSelector(selectPlayers);

  // Deduplicate old games by ID
  const deduplicatedGames = useMemo(
    () =>
      Array.from(new Map(oldGames.map((game) => [game.gameID, game])).values()),
    [oldGames]
  );

  useEffect(() => {
    const storedIds = getStoredGameIds();
    storedIds.forEach((id) => {
      const storedGame = localStorage.getItem(id);
      if (storedGame) {
        dispatch(setOldGame(JSON.parse(storedGame)));
      }
    });
  }, [dispatch]);

  const getStoredGameIds = (): string[] =>
    localStorage.getItem(OLD_IDS_KEY)?.split(",") ?? [];

  const saveStoredGameIds = (ids: string[]) => {
    const uniqueIds = [...new Set(ids)];
    localStorage.setItem(OLD_IDS_KEY, uniqueIds.join(","));
  };

  const handleDeleteLobby = (gameID: string) => {
    const updatedIds = getStoredGameIds().filter((id) => id !== gameID);
    saveStoredGameIds(updatedIds);
    localStorage.removeItem(gameID);
    dispatch(deleteOldGame(gameID));
  };

  function handleStartOldGame(gameID: string) {
    const oldGame = deduplicatedGames.find((g) => g.gameID === gameID);
    if (!oldGame) {
      showError("This game no longer exists.");
      return;
    }

    const allPlayersPresent = oldGame.players.every((p) =>
      players?.some((cur) => cur.playerName === p.playerName)
    );

    if (!allPlayersPresent && production) {
      showError("Ensure that you resume the game with the same players");
      return;
    }

    // Send the old gameId via websockets
    dispatch({
      type: "lobby/oldGame",
      payload: { gameId: gameID, username: username },
    });
  }

  const renderTableRows = () =>
    deduplicatedGames.map(({ gameID, players, type, language }, index) => (
      <tr key={index}>
        <td>{gameID}</td>
        <td>{players.map((p) => p.playerName).join(", ")}</td>
        <td>{type}</td>
        <td>{language}</td>
        <td>
          <Popconfirm
            title={<span style={{ color: "black" }}>Delete this game?</span>}
            onConfirm={() => handleDeleteLobby(gameID)}
            okText="Yes"
            cancelText="No"
            cancelButtonProps={{
              style: {
                backgroundColor: "#2f2f2f",
                color: "white",
                border: "1px solid #2f2f2f",
              },
            }}
            okButtonProps={{
              style: {
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
              },
            }}
            icon={false}
          >
            <DeleteOutlined />
          </Popconfirm>
        </td>
        <td>
          <Popconfirm
            title={<span style={{ color: "black" }}>Resume this game?</span>}
            onConfirm={() => handleStartOldGame(gameID)}
            okText="Yes"
            cancelText="No"
            icon={false}
            cancelButtonProps={{
              style: {
                backgroundColor: "#2f2f2f",
                color: "white",
                border: "1px solid #2f2f2f",
              },
            }}
            okButtonProps={{
              style: {
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
              },
            }}
          >
            <PlayCircleOutlined />
          </Popconfirm>
        </td>
      </tr>
    ));

  return (
    <Modal
      title="Old Games"
      open={visible}
      onCancel={onClose}
      footer={null}
      width="1000px"
    >
      {deduplicatedGames.length === 0 ? (
        <p>
          Unfortunately, there are no saved games. After saving a game, you will
          find it here.
        </p>
      ) : (
        <>
          <p>
            Select the old game you want to start. The players must be the same
            as in the lobby.
          </p>
          <table className={styles.historyField}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Players</th>
                <th>Role</th>
                <th>Language</th>
                <th>Delete</th>
                <th>Play</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </>
      )}
    </Modal>
  );
};

export default HistoryModal;
