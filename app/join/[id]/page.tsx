"use client";
import "@ant-design/v5-patch-for-react-19";
import { useRouter, useParams } from "next/navigation";
import styles from "@/styles/page.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { selectUsername, setUsername } from "@/lib/features/player";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinLobby } from "@/lib/features/lobby/api";
import { AppDispatch } from "@/lib/store";
import { useErrorModal } from "@/context/ErrorModalContext";
import { useLobbyErrorHandler } from "@/hooks/lobby/useLobbyErrorHandler";
import { useLobbySuccessHandler } from "@/hooks/lobby/useLobbySuccessHandler";
import { USERNAME_KEY } from "@/lib/features/player/player.types";

export default function JoinWithID() {
  const dispatch = useDispatch<AppDispatch>();
  const { showError } = useErrorModal();
  const router = useRouter();

  // Display the error detected in the lobby
  useLobbyErrorHandler();
  // Listen for new lobbies and redirect to them
  useLobbySuccessHandler("/lobby");

  const username = useSelector(selectUsername);

  // Get the id from the react navigation
  const params = useParams();
  const { id } = params;

  async function handleJoinButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!username) {
      showError("Please provide a codename.");
      return;
    }

    if (typeof id !== "string" || id.trim() === "") {
      showError("Please provide a valid lobby ID.");
      return;
    }

    // Store the username inside the localStorage
    localStorage.setItem(USERNAME_KEY, username);
    // Try to join the lobby
    dispatch(joinLobby({ lobbyId: id, username: username }));
  }

  return (
    <div className={styles.centered}>
      <div className={styles.blueOverlay}></div>
      <div className={styles.messageContainer}>
        <div className={styles.messageField}>
          Choose a codename to enter the lobby
          <br />
          {id} <br />
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
