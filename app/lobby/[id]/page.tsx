"use client";
import "@ant-design/v5-patch-for-react-19";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayerName } from "@/lib/features/player";
import {
  selectLobby,
  selectLobbyId,
  selectLobbyStatus,
  selectPlayersReady,
} from "@/lib/features/lobby";
import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import { Modal, Popconfirm, Tooltip } from "antd";
import { useEffect, useState } from "react";
import GetReady from "@/components/GetReady";
import PlayerTable from "@/components/playerTable";
import ConfigurationPanel from "@/components/configuration/ConfigurationPanel";
import { AppDispatch } from "@/lib/store";
import { deleteLobby, leaveLobby, updateLobby } from "@/lib/features/lobby/api";
import { createGame } from "@/lib/features/game/api";
import { selectGameId, selectGameStatus } from "@/lib/features/game";
import { isProduction } from "../../../utils/environment";
import { selectIsHost } from "../../../utils/helpers";
import HistoryButton from "@/components/buttons/HistoryButton";

export default function Lobby() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const lobbyId = useSelector(selectLobbyId);
  const lobby = useSelector(selectLobby);

  const playerName = useSelector(selectPlayerName);
  const isHost = useSelector(selectIsHost);

  const playersReady = useSelector(selectPlayersReady);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isGameStarting, setGameStarting] = useState(false);

  const lobbyStatus = useSelector(selectLobbyStatus);
  const gameStatus = useSelector(selectGameStatus);
  const gameId = useSelector(selectGameId);

  // Connect to the lobby websocket
  useEffect(() => {
    if (lobbyId) {
      dispatch({
        type: "lobby/connect",
        payload: { lobbyID: lobbyId },
      });
    }
  }, [dispatch, lobbyId]);

  // Once fetched the gameId redirect to the game screen
  useEffect(() => {
    if (gameStatus === "succeeded") {
      setGameStarting(true);
      setTimeout(() => {
        disconnectLobby();
        router.push(`/game/${gameId}`);
      }, 3000);
    }
  }, [gameId, router, gameStatus]);

  // Lobby object does not exist anymore
  useEffect(() => {
    if (lobbyStatus === "idle") {
      disconnectLobby();
      router.back();
    }
  }, [lobbyStatus, router]);

  function disconnectLobby() {
    // Disconnect websocket
    dispatch({
      type: "lobby/disconnect",
    });
  }

  function handleLeaveLobby() {
    if (lobbyId && playerName) {
      dispatch(leaveLobby({ lobbyId: lobbyId, username: playerName }));
    }
  }

  const handleConfigPanel = () => {
    if (lobbyId && playerName && lobby) {
      dispatch(
        updateLobby({ lobbyId: lobbyId, username: playerName, lobby: lobby })
      );
      setIsPanelOpen((state) => !state);
    }
  };

  const handleStartGame = () => {
    if (gameStatus === "idle" && lobby && playerName) {
      dispatch(createGame({ lobby: lobby, username: playerName }));
    }
  };

  function confirmDeleteLobby() {
    if (lobbyId && playerName) {
      dispatch(
        deleteLobby({
          lobbyId: lobbyId,
          username: playerName,
        })
      );
    }
  }

  if (isGameStarting) {
    return <GetReady />;
  }

  return (
    <div className={styles.centered}>
      {isHost && <HistoryButton />}
      <div className={styles.redBlueOverlay} />
      <Modal
        styles={modalStyles}
        title={<span style={{ color: "white" }}>Configuration Panel</span>}
        open={isPanelOpen}
        onOk={handleConfigPanel}
        okButtonProps={{
          style: { fontFamily: "Gabarito", fontSize: "20px" },
        }}
        okText="Save"
        onCancel={() => setIsPanelOpen((state) => !state)}
        cancelButtonProps={{
          style: { fontFamily: "Gabarito", fontSize: "20px" },
        }}
        cancelText="Cancel"
      >
        <ConfigurationPanel />
      </Modal>
      <div className={styles.messageContainer}>
        <div className={styles.lobbyTitle}>Game Lobby</div>
        <PlayerTable />

        {!isHost && (
          <div className={styles.regularButtonContainer}>
            <button className={styles.regularButton} onClick={handleLeaveLobby}>
              Leave Lobby
            </button>
          </div>
        )}
        {isHost && (
          <div className={styles.regularButtonContainer}>
            <button
              className={styles.regularButton}
              onClick={handleConfigPanel}
            >
              Change Setup
            </button>
            <button
              className={`${styles.regularButton} ${
                playersReady?.length !== 4 ? styles.disabledButton : ""
              }`}
              onClick={handleStartGame}
              disabled={isProduction() && playersReady?.length !== 4}
            >
              <Tooltip
                title={
                  playersReady?.length !== 4
                    ? "You need exactly 4 players to start the game"
                    : ""
                }
              >
                Start Game
              </Tooltip>
            </button>
            <Popconfirm
              title={
                <span style={{ color: "black" }}>
                  Are you sure if you want to delete the lobby?
                </span>
              }
              onConfirm={confirmDeleteLobby}
              // onCancel={cancelDeleteLobby}
              okText="Yes"
              cancelText="No"
              icon={false}
            >
              <button className={styles.regularButton}>Delete Lobby</button>
            </Popconfirm>
          </div>
        )}
      </div>
    </div>
  );
}

const modalStyles = {
  content: {
    display: "contents",
    backgroundColor: "#2f2f2f",
    fontFamily: "Special Elite",
  },
  body: {
    backgroundColor: "#2f2f2f",
    outline: "1px dashed white",
    outlineOffset: "-10px",
    fontFamily: "Special Elite",
    color: "white",
    borderRadius: "20px",
    padding: "20px",
  },
  header: {
    backgroundColor: "#2f2f2f",
    outline: "1px dashed white",
    outlineOffset: "-10px",
    fontFamily: "Special Elite",
    borderRadius: "20px",
    padding: "20px",
  },
  footer: {
    align: "center",
    backgroundColor: "#2f2f2f",
    outline: "1px dashed white",
    outlineOffset: "-10px",
    fontFamily: "Special Elite",
    color: "white",
    borderRadius: "20px",
    padding: "20px",
  },
};
