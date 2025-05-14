"use client";
import "@ant-design/v5-patch-for-react-19";
import {useRouter} from "next/navigation";
import styles from "@/styles/page.module.css";
import {CopyOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import {selectLobbyId} from "@/lib/features/lobby";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {AppDispatch} from "@/lib/store";
import {deleteLobby} from "@/lib/features/lobby/api";
import {selectPlayerName} from "@/lib/features/player";

export default function Create() {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const id = useSelector(selectLobbyId);
  const playerName = useSelector(selectPlayerName);


  const url = `${globalThis.location.origin}/join/${id}`;

  function handleOpenLobby() {
    router.push(`/lobby/${id}`);
  }

  // Connect to the ws before for the host
  useEffect(() => {
    if (id) {
      dispatch({
        type: "lobby/connect",
        payload: { lobbyID: id },
      });
    }
  }, [dispatch, id]);

  function handleDeleteLobby() {
    if (id && playerName) {
      dispatch(deleteLobby({username: playerName, lobbyId: id}));
      router.replace("/");
    } else {
      router.replace("/");
    }
  }

  if (!id) {
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
            style={{ width: "100%", marginBottom: "10px" }}
            onClick={() => navigator.clipboard.writeText(url)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                textAlign: "left",
              }}
            >
              <span>{url}</span>
              <CopyOutlined />
            </div>
          </button>
          <button
            className={styles.regularButton}
            style={{ width: "100%" }}
            onClick={id ? () => navigator.clipboard.writeText(id) : undefined}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                textAlign: "left",
              }}
            >
              <span>{id}</span>
              <CopyOutlined />
            </div>
          </button>
        </div>
        <div className={styles.regularButtonContainer}>
          <button className={styles.regularButton} onClick={handleDeleteLobby}>
            <LeftOutlined/> Delete Lobby
          </button>
          <button className={styles.regularButton} onClick={handleOpenLobby}>
            Open Lobby <RightOutlined/>
          </button>
        </div>
      </div>
    </div>
  );
}
