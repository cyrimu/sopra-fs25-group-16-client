"use client";
import "@ant-design/v5-patch-for-react-19";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayerName } from "@/lib/features/player";
import {
  selectHost,
  selectLobby,
  selectLobbyId,
  selectLobbyStatus,
} from "@/lib/features/lobby";
import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import { Modal, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import GetReady from "@/components/GetReady";
import PlayerTable from "@/components/playerTable";
import ConfigurationPanel from "@/components/configuration/ConfigurationPanel";
import { AppDispatch } from "@/lib/store";
import { leaveLobby, updateLobby } from "@/lib/features/lobby/api";
import { createGame } from "@/lib/features/game/api";
import { selectGameId, selectGameStatus } from "@/lib/features/game";

export default function Lobby() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const lobbyId = useSelector(selectLobbyId);
  const lobby = useSelector(selectLobby);
  const playerName = useSelector(selectPlayerName);
  const hostName = useSelector(selectHost);
  const isHost = playerName === hostName;

  const [isConfigurationPanelOpen, setConfigurationPanelOpen] = useState(false);
  const [isGameStarting, setGameStarting] = useState(false);

  const lobbyStatus = useSelector(selectLobbyStatus);
  const gameStatus = useSelector(selectGameStatus);
  const gameId = useSelector(selectGameId);

  const handleConfigPanel = () => {
    if (lobbyId && playerName && lobby) {
      dispatch(
        updateLobby({ lobbyId: lobbyId, username: playerName, lobby: lobby })
      );
      setConfigurationPanelOpen((state) => !state);
    }
  };

  const handleStartGame = () => {
    if (gameStatus === "idle" && lobby && playerName) {
      dispatch(createGame({ lobby: lobby, username: playerName }));
    }
  };

  useEffect(() => {
    if (gameStatus === "succeeded") {
      setGameStarting(true);
      setTimeout(() => {
        router.push(`/game/${gameId}`);
      }, 3000);
    }
  }, [gameId, router, gameStatus]);

  function handleLeaveLobby() {
    if (lobbyId && playerName) {
      dispatch(leaveLobby({ lobbyId: lobbyId, username: playerName }));
    }
  }

  useEffect(() => {
    if (lobbyStatus === "idle") {
      // After the lobby is removed go back
      router.back();
    }
  }, [lobbyStatus]);

  const confirmDeleteLobby = () => {
    router.replace("/create");
  };

  const cancelDeleteLobby = () => {
    router.back();
  };

  if (isGameStarting) {
    return <GetReady />;
  }

  return (
    <div className={styles.centered}>
      <div className={styles.redBlueOverlay}></div>
      <div className={styles.messageContainer}>
        {!isConfigurationPanelOpen && (
          <div className={styles.lobbyTitle}>Game Lobby</div>
        )}
        {!isConfigurationPanelOpen && <PlayerTable />}
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
            <Modal
              styles={modalStyles}
              title={
                <span style={{ color: "white" }}>Configuration Panel</span>
              }
              open={isConfigurationPanelOpen}
              onOk={handleConfigPanel}
              okButtonProps={{
                style: { fontFamily: "Gabarito", fontSize: "20px" },
              }}
              okText="Save"
              onCancel={handleConfigPanel}
              cancelButtonProps={{
                style: { fontFamily: "Gabarito", fontSize: "20px" },
              }}
              cancelText="Cancel"
            >
              <ConfigurationPanel />
            </Modal>
            <button className={styles.regularButton} onClick={handleStartGame}>
              Start Game
            </button>
            <Popconfirm
              title={
                <span style={{ color: "black" }}>
                  Are you sure if you want to delete the lobby?
                </span>
              }
              onConfirm={confirmDeleteLobby}
              onCancel={cancelDeleteLobby}
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
