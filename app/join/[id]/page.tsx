"use client";
import "@ant-design/v5-patch-for-react-19";
import { useRouter, useParams } from "next/navigation";
import styles from "@/styles/page.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { setPlayerName } from "@/lib/features/player";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLobbyStatus } from "@/lib/features/lobby";
import { joinLobby } from "@/lib/features/lobby/api";
import { AppDispatch } from "@/lib/store";

export default function JoinWithID() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { id } = params;
  const [username, setUsername] = useState<string | undefined>();

  const lobbyStatus = useSelector(selectLobbyStatus);

  useEffect(() => {
    if (lobbyStatus === "succeeded") {
      if (id) router.push(`/lobby/${id}`);
    }
  }, [id, lobbyStatus, router]);

  function handleJoinButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!username) throw new Error("A username must be provided");
    if (typeof id !== "string" || id.trim() === "") {
      throw new Error("A valid lobby ID must be provided");
    }

    dispatch(setPlayerName(username));
    // Try to join the lobby and set it inside the provider
    dispatch(joinLobby({ lobbyId: id, username: username }));
  }

  function handleBackButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.replace("/join");
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
            className={styles.inputField}
            placeholder="Choose your codename ... "
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className={styles.regularButtonContainer}>
            <button className={styles.regularButton} onClick={handleBackButton}>
              <LeftOutlined /> Join different lobby
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
