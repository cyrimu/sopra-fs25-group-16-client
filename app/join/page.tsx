"use client";
import "@ant-design/v5-patch-for-react-19";
import { useRouter } from "next/navigation";
import styles from "@/styles/page.module.css";
import { RightOutlined } from "@ant-design/icons";
import { setPlayerName } from "@/lib/features/player";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLobbyStatus } from "@/lib/features/lobby";
import { joinLobby } from "@/lib/features/lobby/api";
import { AppDispatch } from "@/lib/store";

export default function Join() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState("");
  const [id, setId] = useState("");

  const lobbyStatus = useSelector(selectLobbyStatus);

  function handleJoinButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (lobbyStatus === "idle" && username && id) {
      // Store the username
      dispatch(setPlayerName(username));
      // Try to join the lobby and thhere fore get it
      try {
        dispatch(joinLobby({ lobbyId: id, username: username }));
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    if (lobbyStatus === "succeeded") {
      if (id) router.push(`/lobby/${id}`);
    }
  }, [lobbyStatus]);

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
            className={styles.inputField}
            placeholder="Choose your codename ... "
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.inputField}
            placeholder="Enter Lobby ID ... "
            onChange={(e) => setId(e.target.value)}
          />
          <button className={styles.regularButton} onClick={handleJoinButton}>
            Join <RightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}
