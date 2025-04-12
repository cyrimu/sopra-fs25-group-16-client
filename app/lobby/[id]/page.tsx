"use client";
import "@ant-design/v5-patch-for-react-19";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayerName } from "@/lib/features/player";
import {
  selectHost,
  selectLobbyId,
  selectLobbyStatus,
} from "@/lib/features/lobby";
import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import { Modal, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import GetReadyScreen from "@/components/GetReady";
import PlayerTable from "@/components/PlayerTable";
import ConfigurationPanel from "@/components/configuration/ConfigurationPanel";
import { AppDispatch } from "@/lib/store";
import { leaveLobby } from "@/lib/features/lobby/api";

export default function Lobby() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const id = useSelector(selectLobbyId);
  const playerName = useSelector(selectPlayerName);
  const hostName = useSelector(selectHost);
  const isHost = playerName === hostName;

  const [isConfigurationPanelOpen, setConfigurationPanelOpen] = useState(false);
  const [isGameStarting, setGameStarting] = useState(false);

  const lobbyStatus = useSelector(selectLobbyStatus);

  const handleConfigPanel = () => {
    setConfigurationPanelOpen((state) => !state);
  };

  const handleStartGame = () => {
    setGameStarting(true);
    setTimeout(() => {
      router.push(`/game/${id}`);
    }, 3000);
  };

  function handleLeaveLobby() {
    if (id && playerName) {
      try {
        dispatch(leaveLobby({ lobbyId: id, username: playerName }));
      } catch (error) {
        console.error(error);
      }
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
    return <GetReadyScreen />;
  }

  return (
    <div className={styles.centered}>
      <div className={styles.redBlueOverlay}></div>
      <div className={styles.messageContainer}>
        {!isConfigurationPanelOpen && (
          <div className={styles.lobbyTitle}>Game Lobby</div>
        )}
        {!isConfigurationPanelOpen && <PlayerTable />}
        {isHost && (
          <div className={styles.regularButtonContainer}>
            <button className={styles.regularButton} onClick={handleLeaveLobby}>
              Leave Lobby
            </button>
          </div>
        )}
        {/* //TODO: CHANGE THIS !isHost */}
        {!isHost && (
          <div className={styles.regularButtonContainer}>
            <button
              className={styles.regularButton}
              onClick={handleConfigPanel}
            >
              Change Setup
            </button>
            <Modal
              styles={modalStyles as any}
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
    textAlign: "center",
    backgroundColor: "#2f2f2f",
    outline: "1px dashed white",
    outlineOffset: "-10px",
    fontFamily: "Special Elite",
    color: "white",
    borderRadius: "20px",
    padding: "20px",
  },
};
