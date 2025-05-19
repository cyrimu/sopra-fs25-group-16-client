"use client";
import "@ant-design/v5-patch-for-react-19";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { message, Modal, Popconfirm, Tooltip } from "antd";
import { selectUsername } from "@/lib/features/player";
import {
  selectLobby,
  selectLobbyId,
  selectPlayers,
} from "@/lib/features/lobby";
import { AppDispatch } from "@/lib/store";
import { deleteLobby, leaveLobby, updateLobby } from "@/lib/features/lobby/api";
import { createGame } from "@/lib/features/game/api";
import { isProduction } from "../../../utils/environment";
import { selectIsHostInLobby } from "../../../utils/helpers";
import PlayerTable from "@/components/playerTable";
import ConfigurationPanel from "@/components/configuration/ConfigurationPanel";
import HistoryButton from "@/components/buttons/HistoryButton";
import GameLoading from "@/components/GameLoading";
import { useErrorModal } from "@/context/ErrorModalContext";
import { useGameSucessHandler } from "@/hooks/game/useGameSucessHandler";
import { useLobbyDeleteHandler } from "@/hooks/lobby/useLobbyDeleteHandler";
import { useGameStarting } from "@/context/GameStartingContext";
import styles from "@/styles/page.module.css";
import { selectDeleteLobby } from "@/lib/features/flags";
import { InfoCircleOutlined } from "@ant-design/icons";

export default function Lobby() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { showError } = useErrorModal();

  const lobbyId = useSelector(selectLobbyId);
  const lobby = useSelector(selectLobby);
  const username = useSelector(selectUsername);
  const isHost = useSelector(selectIsHostInLobby);
  const players = useSelector(selectPlayers);
  const nonNullPlayers = players?.filter((e) => e) ?? [];

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { gameStarting } = useGameStarting();
  const buttonClicked = useRef(false);

  const deleteLobbyFlag = useSelector(selectDeleteLobby);

  useEffect(() => {
    if (deleteLobbyFlag) {
      message.open({
        content: "The host has deleted the lobby",
        duration: 3,
        icon: <InfoCircleOutlined style={{ color: "black" }} />,
      });
    }
  }, [deleteLobbyFlag]);

  // Hooks for additional functionality
  useGameSucessHandler();
  useLobbyDeleteHandler();

  const handleLeaveLobby = () => {
    if (!lobbyId) {
      showError("Something went wrong when leaving the lobby");
      return;
    }

    dispatch(leaveLobby({ lobbyId: lobbyId, username: username }));
    router.replace("/");
  };

  const handleUpdateLobbyConfiguration = () => {
    if (!lobbyId || !lobby) {
      showError("Something went wrong when updating the lobby");
      return;
    }

    // Send a post request with the updated lobby object
    dispatch(
      updateLobby({ lobbyId: lobbyId, username: username, lobby: lobby })
    );
    setIsPanelOpen(false);
  };

  const handleStartGame = () => {
    if (!lobby) {
      showError("Something went wrong when starting the game");
      return;
    }
    buttonClicked.current = true;
    dispatch(createGame({ lobby: lobby, username: username }));
  };

  const confirmDeleteLobby = () => {
    if (!lobbyId) {
      showError("Something went wrong when deleting the lobby");
      return;
    }

    // Delete the lobby
    dispatch(
      deleteLobby({
        lobbyId: lobbyId,
        username: username,
      })
    );
  };

  const startButtonDisabled = () => {
    const rolesAssigned = nonNullPlayers.every((player) => player.role);
    return (
      isProduction() &&
      (!(nonNullPlayers.length >= 4) || !rolesAssigned || buttonClicked.current)
    );
  };

  if (gameStarting) return <GameLoading />;

  if (!lobby)
    return (
      <div className={styles.centered}>
        <div className={styles.redBlueOverlay} />
        <div className={styles.messageContainer}>
          <div className={styles.lobbyTitle}>Game Lobby</div>
          <PlayerTable />
        </div>
      </div>
    );

  return (
    <div className={styles.centered}>
      {isHost && <HistoryButton />}
      <div className={styles.redBlueOverlay} />
      <Modal
        styles={modalStyles}
        title={<span style={{ color: "white" }}>Configuration Panel</span>}
        open={isPanelOpen}
        onOk={handleUpdateLobbyConfiguration}
        okButtonProps={{
          style: { fontFamily: "Gabarito", fontSize: "20px" },
        }}
        okText="Save"
        onCancel={() => setIsPanelOpen(false)}
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
            <Tooltip title="Configure game mode, language, teams, and roles">
              <button
                className={styles.regularButton}
                onClick={() => setIsPanelOpen(true)}
              >
                Change Setup
              </button>
            </Tooltip>
            <button
              className={styles.regularButton}
              onClick={handleStartGame}
              disabled={startButtonDisabled()}
            >
              <Tooltip
                title={
                  nonNullPlayers.length < 4
                    ? "You need 4 configured players inside the lobby"
                    : "Start Game"
                }
              >
                Start Game
              </Tooltip>
            </button>
            <Popconfirm
              title={
                <span style={{ color: "black" }}>
                  Are you sure you want to delete the lobby?
                </span>
              }
              onConfirm={confirmDeleteLobby}
              cancelText="No"
              okText="Yes"
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
              icon={true}
            >
              <Tooltip title="Delete lobby">
                <button className={styles.regularButton}>Delete Lobby</button>
              </Tooltip>
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
    textAlign: "center" as const,
    backgroundColor: "#2f2f2f",
    outline: "1px dashed white",
    outlineOffset: "-10px",
    fontFamily: "Special Elite",
    color: "white",
    borderRadius: "20px",
    padding: "20px",
  },
};
