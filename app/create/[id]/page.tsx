"use client";
import "@ant-design/v5-patch-for-react-19";
import { useRouter } from "next/navigation";
import styles from "@/styles/page.module.css";
import { CopyOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { selectLobbyId } from "@/lib/features/lobby";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { AppDispatch } from "@/lib/store";
import { deleteLobby } from "@/lib/features/lobby/api";
import { selectUsername } from "@/lib/features/player";
import { useErrorModal } from "@/context/ErrorModalContext";
import {
  cleanLobbyLocalStorage,
  disconnectLobby,
} from "@/hooks/lobby/useLobbyWsConnect";
import { useLobbyErrorHandler } from "@/hooks/lobby/useLobbyErrorHandler";

export default function Create() {
  const router = useRouter();
  const { showError } = useErrorModal();

  const dispatch = useDispatch<AppDispatch>();

  const lobbyId = useSelector(selectLobbyId);
  const username = useSelector(selectUsername);

  // Handle lobby errors and display them
  useLobbyErrorHandler();

  function handleDeleteLobby() {
    if (!lobbyId) {
      // If the lobby is null display an error message
      showError("Something went wrong when deleting the lobby");
      return;
    }

    // Delete the lobby from the provider
    dispatch(deleteLobby({ username: username, lobbyId: lobbyId }));
    // Disconnect the WS from the lobby
    disconnectLobby(dispatch);
    // Clean the lobby from the local storage
    cleanLobbyLocalStorage(localStorage);
    router.replace("/");
  }

  if (!lobbyId) {
    return (
      <div className={styles.centered}>
        <div className={styles.redOverlay}></div>
        <div className={styles.messageContainer}>
          <div className={styles.messageField}>
            Seems that the lobby you created does not exist anymore. <br />
            <br />
            You should navigate back and create a new lobby. <br />
            <br />
            - CN
            <br />
          </div>
          <div className={styles.regularButtonContainer}>
            <button
              className={styles.regularButton}
              onClick={() => router.replace("/create")}
            >
              Create New Lobby
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.centered}>
      <div className={styles.redOverlay}></div>
      <div className={styles.messageContainer}>
        <div className={styles.messageField}>
          Share the following ID with your fellow spies. <br />
          <br />
          They have been instructed to join you. <br />
          <br />
          - CN
          <br />
          <button
            className={styles.regularButton}
            style={{ width: "100%" }}
            onClick={
              lobbyId ? () => navigator.clipboard.writeText(lobbyId) : undefined
            }
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                textAlign: "left",
              }}
            >
              <span>{lobbyId}</span>
              <CopyOutlined />
            </div>
          </button>
        </div>
        <div className={styles.regularButtonContainer}>
          <button className={styles.regularButton} onClick={handleDeleteLobby}>
            <LeftOutlined /> Delete Lobby
          </button>
          <button
            className={styles.regularButton}
            onClick={() => router.push(`/lobby/${lobbyId}`)}
          >
            Open Lobby <RightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}
