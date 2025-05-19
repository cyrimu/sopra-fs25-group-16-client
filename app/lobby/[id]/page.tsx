"use client";
import "@ant-design/v5-patch-for-react-19";
import { useDispatch, useSelector } from "react-redux";
import { selectUsername } from "@/lib/features/player";
import {
  selectLobby,
  selectLobbyId,
  selectPlayers,
} from "@/lib/features/lobby";
import styles from "@/styles/page.module.css";
import { Modal, Popconfirm, Tooltip } from "antd";
import { useState } from "react";
import PlayerTable from "@/components/playerTable";
import ConfigurationPanel from "@/components/configuration/ConfigurationPanel";
import { AppDispatch } from "@/lib/store";
import { deleteLobby, leaveLobby, updateLobby } from "@/lib/features/lobby/api";
import { createGame } from "@/lib/features/game/api";
import { isProduction } from "../../../utils/environment";
import { selectIsHostInLobby } from "../../../utils/helpers";
import HistoryButton from "@/components/buttons/HistoryButton";
import {
  cleanLobbyLocalStorage,
  disconnectLobby,
} from "@/hooks/lobby/useLobbyWsConnect";
import { useErrorModal } from "@/context/ErrorModalContext";
import { useGameSucessHandler } from "@/hooks/game/useGameSucessHandler";
import { useRouter } from "next/navigation";
import { useLobbyPersist } from "@/hooks/lobby/useLobbyPersist";
import { useLobbyDeleteHandler } from "@/hooks/lobby/useLobbyDeleteHandler";
import GetReady from "@/components/GetReady";

export default function Lobby() {
  const dispatch = useDispatch<AppDispatch>();
  const { showError } = useErrorModal();
  const router = useRouter();

  const lobbyId = useSelector(selectLobbyId);
  const lobby = useSelector(selectLobby);

  const username = useSelector(selectUsername);
  const isHost = useSelector(selectIsHostInLobby);

  const players = useSelector(selectPlayers);
  const nonNullPlayers = players?.filter((e) => e) ?? [];

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Once fetched the gameId redirect to the game screen
  useGameSucessHandler();

  // Fetch again the lobby when the user reloads the lobby
  useLobbyPersist();

  // Navigate back when the lobby is deleted
  useLobbyDeleteHandler();

  async function handleLeaveLobby() {
    if (!lobbyId) {
      showError("Something went wrong when leaving the lobby");
      return;
    }

    dispatch(leaveLobby({ lobbyId: lobbyId, username: username }));
    router.replace("/");
  }

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
      return <GetReady />;
    }

    // Create a new game and start it
    dispatch(createGame({ lobby: lobby, username: username }));
  };

  function confirmDeleteLobby() {
    if (!lobbyId) {
      showError("Something went wrong when deleting the lobby");
      return;
    }

    // Disconnect the WS from the lobby
    disconnectLobby(dispatch);
    // Clean the lobby from the local storage
    cleanLobbyLocalStorage(localStorage);

    // Delete the lobby
    dispatch(
      deleteLobby({
        lobbyId: lobbyId,
        username: username,
      })
    );

    router.replace("/");
  }

  function startButtonDisabled() {
    return (
      isProduction() &&
      // Players inside the lobby must be 4
      !(nonNullPlayers.length >= 4)
    );
  }

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
                    ? "You need 4 players inside the lobby"
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
    textAlign: "center" as const, // Explicitly cast to the expected type
    backgroundColor: "#2f2f2f",
    outline: "1px dashed white",
    outlineOffset: "-10px",
    fontFamily: "Special Elite",
    color: "white",
    borderRadius: "20px",
    padding: "20px",
  },
};
