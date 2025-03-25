"use client";
import "@ant-design/v5-patch-for-react-19";
import { useRouter } from "next/navigation";
import styles from "@/styles/page.module.css";
import { RightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setPlayerName } from "@/lib/features/player";
import { selectLobbyId, setHost } from "@/lib/features/lobby";

export default function Create() {
  const router = useRouter();
  const dispatch = useDispatch();
  const lobbyId = useSelector(selectLobbyId);

  const [username, setUsername] = useState("");

  function handleJoinButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    dispatch(setPlayerName(username));
    dispatch(setHost(username));

    router.push(`/lobby/${lobbyId}`);
  }

  return (
    <div className={styles.centered}>
      <div className={styles.redOverlay}></div>
      <div className={styles.messageContainer}>
        <div className={styles.messageBox}>
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
          <button className={styles.regularButton} onClick={handleJoinButton}>
            Next <RightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}
