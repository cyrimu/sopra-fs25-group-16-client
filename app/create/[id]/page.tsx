"use client";
import "@ant-design/v5-patch-for-react-19";
import { useRouter } from "next/navigation";
import styles from "@/styles/page.module.css";
import { CopyOutlined } from "@ant-design/icons";
import { deleteLobby, selectLobbyId } from "@/lib/features/lobby";
import { useDispatch, useSelector } from "react-redux";
import Popconfirm from "antd/es/popconfirm";

export default function Create() {
  const dispatch = useDispatch();

  const router = useRouter();
  const id = useSelector(selectLobbyId);
  const url = `${globalThis.location.origin}/join/${id}`;

  function handleOpenLobby() {
    router.push(`/lobby/${id}`);
  }

  function handleDeleteLobby() {
    dispatch(deleteLobby());
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
                textAlign: "left",
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
                textAlign: "left",
              }}
            >
              <span>{id}</span>
              <CopyOutlined />
            </div>
          </button>
        </div>
        <div className={styles.regularButtonContainer}>
          <Popconfirm
            title={
              <span style={{ color: "black" }}>
                Are you sure if you want to delete the lobby?
              </span>
            }
            onConfirm={handleDeleteLobby}
            // onCancel={}
            okText="Yes"
            cancelText="No"
            icon={false}
          >
            <button className={styles.regularButton}>Delete Lobby</button>
          </Popconfirm>
          <button className={styles.regularButton} onClick={handleOpenLobby}>
            Open Lobby
          </button>
        </div>
      </div>
    </div>
  );
}
