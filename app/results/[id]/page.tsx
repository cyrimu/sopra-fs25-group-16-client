"use client";
import { selectWinner } from "@/lib/features/game";
import {
  selectIsHostInLobby,
  selectMyPlayerInGame,
} from "../../../utils/helpers";
import { TEAM_COLOR } from "@/lib/features/game/team.types";
import { useDispatch, useSelector } from "react-redux";
import ResultsTable from "@/components/resultsTable";
import styles from "@/styles/page.module.css";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/lib/store";
import { useEffect, useState } from "react";
import { useErrorModal } from "@/context/ErrorModalContext";
import { selectLobbyId } from "@/lib/features/lobby";
import { leaveLobby } from "@/lib/features/lobby/api";
import { selectUsername } from "@/lib/features/player";
import { useResultReturnLobby } from "@/hooks/result/useResultReturnLobby";
import { selectReturnLobby } from "@/lib/features/flags";
import { InfoCircleOutlined } from "@ant-design/icons";
import { message } from "antd";

function Results() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { showError } = useErrorModal();

  const winner = useSelector(selectWinner);
  const myPlayer = useSelector(selectMyPlayerInGame);

  const isWinner = myPlayer?.team === winner;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const lobbyId = useSelector(selectLobbyId);

  const isHost = useSelector(selectIsHostInLobby);

  const username = useSelector(selectUsername);

  // Listen for the return lobby flag and return to the lobby
  useResultReturnLobby();

  const returnLobby = useSelector(selectReturnLobby);

  useEffect(() => {
    if (returnLobby) {
      message.open({
        content: "The host returned to the lobby",
        duration: 3,
        icon: <InfoCircleOutlined style={{ color: "black" }} />,
      });
    }
  }, [returnLobby]);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const handleLeaveLobby = () => {
    if (!lobbyId) {
      showError("Something went wrong when leaving the lobby");
      return;
    }

    dispatch(leaveLobby({ lobbyId: lobbyId, username: username }));
    router.replace("/");
  };

  function handleBackToLobby() {
    if (!lobbyId) {
      showError("Something went wrong. We cannot retrieve the lobby id");
      return;
    }

    // Send the return lobby message
    dispatch({
      type: "lobby/returnLobby",
    });
  }

  return (
    <div className={styles.centered}>
      {isWinner && winner === TEAM_COLOR.BLUE && (
        <div className={styles.blueOverlay} />
      )}
      {isWinner && winner === TEAM_COLOR.RED && (
        <div className={styles.redOverlay} />
      )}

      <ResultsTable visible={isModalVisible} onClose={hideModal} />

      <div className={styles.messageContainer}>
        <div className={styles.messageField}>
          <p className={styles.resultsMessage}>
            {isWinner
              ? "Congrats, no one can outspy you!"
              : "Better luck next time..."}
          </p>
        </div>

        <div className={styles.regularButtonContainer}>
          <button className={styles.regularButton} onClick={handleLeaveLobby}>
            Leave Lobby
          </button>
          {isHost && (
            <button
              className={styles.regularButton}
              onClick={handleBackToLobby}
            >
              Back to Lobby
            </button>
          )}
          <button className={styles.regularButton} onClick={showModal}>
            View Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
