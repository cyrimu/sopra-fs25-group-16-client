"use client";
import "@ant-design/v5-patch-for-react-19";
import { useRouter } from "next/navigation";
import styles from "@/styles/page.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { setUsername, selectUsername } from "@/lib/features/player";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinLobby } from "@/lib/features/lobby/api";
import { AppDispatch } from "@/lib/store";
import { useErrorModal } from "@/context/ErrorModalContext";
import { useLobbyErrorHandler } from "@/hooks/lobby/useLobbyErrorHandler";

export default function Join() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { showError } = useErrorModal();

  const [lobbyId, setLobbyId] = useState<string | undefined>();

  const username = useSelector(selectUsername);

  // Display the error detected in the lobby
  useLobbyErrorHandler();

  async function handleJoinButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!username) {
      showError("Please provide a codename.");
      return;
    }

    if (!lobbyId) {
      showError("Please provide a valid lobby ID.");
      return;
    }
    // Try to join the lobby otherwise the error is already handled
    const resultAction = await dispatch(
      joinLobby({ lobbyId: lobbyId, username: username })
    ).unwrap();

    router.push(`/lobby/${resultAction.lobbyID}`);
  }

  return (
    <div className={styles.centered}>
      <div className={styles.blueOverlay}></div>
      <div className={styles.messageContainer}>
        <div className={styles.messageField}>
          Choose a codename & we’ll create a game lobby for you. <br />
          <br />
          Await further instructions.
          <br />
          <br />- CN
        </div>
        <div className={styles.inputContainer}>
          <input
            value={username}
            className={styles.inputField}
            placeholder="Choose your codename ... "
            onChange={(e) => dispatch(setUsername(e.target.value))}
          />
          <input
            className={styles.inputField}
            placeholder="Enter Lobby ID ... "
            onChange={(e) => setLobbyId(e.target.value)}
          />
          <div style={{ display: "flex", gap: "50px" }}>
            <button
              className={styles.regularButton}
              onClick={() => router.push("/")}
            >
              <LeftOutlined /> Back
            </button>
            <button className={styles.regularButton} onClick={handleJoinButton}>
              Join <RightOutlined />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
