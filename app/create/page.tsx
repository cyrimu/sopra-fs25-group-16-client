"use client";
import "@ant-design/v5-patch-for-react-19";
import { useRouter } from "next/navigation";
import styles from "@/styles/page.module.css";
import { RightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectLobbyId, selectLobbyStatus } from "@/lib/features/lobby";
import { createLobby } from "@/lib/features/lobby/api";
import { AppDispatch } from "@/lib/store";
import { setPlayerName } from "@/lib/features/player";

export default function Create() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState<string | undefined>();

  const lobbyStatus = useSelector(selectLobbyStatus);
  const id = useSelector(selectLobbyId);

  function handleNextButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!username) throw new Error("A username must be provided");

    if (lobbyStatus === "idle") {
      // Store the username
      dispatch(setPlayerName(username));
      // Create a new lobby with a given username
      dispatch(createLobby(username));
    }
  }

  useEffect(() => {
    if (lobbyStatus === "succeeded") {
      if (id) router.push(`/create/${id}`);
    }
  }, [id, lobbyStatus, router]);

  return (
    <div className={styles.centered}>
      <div className={styles.redOverlay}></div>
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
          <button className={styles.regularButton} onClick={handleNextButton}>
            Next <RightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}
