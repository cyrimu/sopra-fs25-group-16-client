"use client";
import "@ant-design/v5-patch-for-react-19";
import { useRouter } from "next/navigation";
import styles from "@/styles/page.module.css";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import { setPlayerName } from "@/lib/features/player";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLobbyStatus } from "@/lib/features/lobby";
import { joinLobby } from "@/lib/features/lobby/api";
import { AppDispatch } from "@/lib/store";
import ErrorModal from "@/components/errorModal";

export default function Join() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState<string | undefined>();
  const [id, setId] = useState<string | undefined>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const lobbyStatus = useSelector(selectLobbyStatus);

  useEffect(() => {
    if (lobbyStatus === "succeeded") {
      if (id) router.push(`/lobby/${id}`);
    }
  }, [id, lobbyStatus, router]);

  async function handleJoinButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!username?.trim()) {
      setErrorMessage("Please provide a codename.");
      setIsModalVisible(true);
      return;
    }

    if (!id) {
      setErrorMessage("Please provide a valid lobby ID.");
      setIsModalVisible(true);
      return;
    }

    if (lobbyStatus === "idle") {
      try {
        dispatch(setPlayerName(username));
        await dispatch(joinLobby({lobbyId: id, username: username})).unwrap();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
          setErrorMessage(error.message);
          setIsModalVisible(true);
      }
    }
  }

  function handleBackButton() {
    router.push("/");
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
            className={styles.inputField}
            placeholder="Choose your codename ... "
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.inputField}
            placeholder="Enter Lobby ID ... "
            onChange={(e) => setId(e.target.value)}
          />
          <div style={{ display: "flex", gap: "50px" }}>
            <button className={styles.regularButton} onClick={handleBackButton}>
              <LeftOutlined /> Back
            </button>
            <button className={styles.regularButton} onClick={handleJoinButton}>
              Join <RightOutlined />
            </button>
          </div>
          <ErrorModal
              visible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
              message={errorMessage}
          />
        </div>
      </div>
    </div>
  );
}
