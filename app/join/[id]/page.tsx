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
import ErrorModal from "@/components/errorModal";

export default function JoinWithID() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = params;
  const [username, setUsername] = useState<string | undefined>();

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
    if (typeof id !== "string" || id.trim() === "") {
      setErrorMessage("Please provide a valid lobby ID.");
      setIsModalVisible(true);
      return;
    }
    try {
      dispatch(setPlayerName(username));
      await dispatch(joinLobby({lobbyId: id, username: username})).unwrap(); // Unwraps the promise to catch errors
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.message);
      setIsModalVisible(true);
    }
  }

  function handleBackButton() {
    router.back();
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