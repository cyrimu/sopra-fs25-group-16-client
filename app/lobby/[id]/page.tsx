"use client";
import "@ant-design/v5-patch-for-react-19";
import { useSelector } from "react-redux";
import { selectPlayerName } from "@/lib/features/player";
import { selectHost, selectLobbyId } from "@/lib/features/lobby";
import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import { Modal, Popconfirm } from "antd";
import { useState } from "react";
import GetReadyScreen from "@/components/GetReady";
import PlayerTable from "@/components/PlayerTable";
import ConfigurationPanel from "@/components/configuration/ConfigurationPanel";

export default function Lobby() {
  const router = useRouter();

  const id = useSelector(selectLobbyId);
  const playerName = useSelector(selectPlayerName);
  const hostName = useSelector(selectHost);
  const isHost = playerName === hostName;

  const [isConfigurationPanelOpen, setConfigurationPanelOpen] = useState(false);
  const [isGameStarting, setGameStarting] = useState(false);

  const handleConfigPanel = () => {
    setConfigurationPanelOpen((state) => !state);
  };

  const handleStartGame = () => {
    setGameStarting(true);
    setTimeout(() => {
      router.push(`/game/${id}`);
    }, 3000);
  };

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
