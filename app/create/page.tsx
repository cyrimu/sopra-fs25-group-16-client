"use client";
import "@ant-design/v5-patch-for-react-19";
import { useRouter } from "next/navigation";
import styles from "@/styles/page.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createLobby } from "@/lib/features/lobby/api";
import { AppDispatch } from "@/lib/store";
import { selectUsername, setUsername } from "@/lib/features/player";
import { useErrorModal } from "@/context/ErrorModalContext";
import { useLobbyErrorHandler } from "@/hooks/lobby/useLobbyErrorHandler";

export default function Create() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { showError } = useErrorModal();

  const username = useSelector(selectUsername);

  async function handleNextButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!username) {
      showError("Please provide a codename.");
      return;
    }
    // Create the lobby and change the status to successfull/failed
    const resultAction = await dispatch(createLobby(username)).unwrap();

    router.push(`/lobby/${resultAction.lobbyID}`);
  }

  // Listen for errors inside the lobby provider
  useLobbyErrorHandler();

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
            <button className={styles.regularButton} onClick={handleNextButton}>
              Create <RightOutlined />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
