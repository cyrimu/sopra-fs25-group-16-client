import React from "react";
import styles from "@/styles/page.module.css";

const GetReady: React.FC = () => {
  return (
    <div className={styles.centered}>
      <div className={styles.redBlueOverlay}></div>
      <div className={styles.messageField}>
        Get ready, your game is starting. <br />
        <br />
        You are on your own now.
        <br />
        <br />- CN
      </div>
    </div>
  );
};

export default GetReady;
