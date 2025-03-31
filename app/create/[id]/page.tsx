"use client";
import "@ant-design/v5-patch-for-react-19";
import { useRouter } from "next/navigation";
import styles from "@/styles/page.module.css";
import { CopyOutlined } from "@ant-design/icons";
import { selectLobbyId } from "@/lib/features/lobby";
import { useSelector } from "react-redux";

export default function Create() {
  const router = useRouter();
  const id = useSelector(selectLobbyId);
  const url = `${window.location.origin}/join/${id}`;

  function handleOpenLobby() {
    router.push(`/lobby/${id}`);
  }

  function handleDeleteLobby() {
    router.back();
  }

  return (
    <div className={styles.centered}>
      <div className={styles.redOverlay}></div>
      <div className={styles.messageContainer}>
        <div className={styles.messageField}>
          Share the following ID with your fellow spies. <br />
          <br />
          They have been instructed to join you. <br />
          <br />
          - CN
          <br />
          <button
            className={styles.regularButton}
            style={{ width: "100%", marginBottom: "10px" }}
            onClick={() => navigator.clipboard.writeText(url)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span>{url}</span>
              <CopyOutlined />
            </div>
          </button>
          <button
            className={styles.regularButton}
            style={{ width: "100%" }}
            onClick={id ? () => navigator.clipboard.writeText(id) : undefined}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span>{id}</span>
              <CopyOutlined />
            </div>
          </button>
        </div>
        <div className={styles.regularButtonContainer}>
          <button className={styles.regularButton} onClick={handleDeleteLobby}>
            Delete Lobby
          </button>
          <button className={styles.regularButton} onClick={handleOpenLobby}>
            Open Lobby
          </button>
        </div>
      </div>
    </div>
  );
}
