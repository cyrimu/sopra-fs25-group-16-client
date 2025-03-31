"use client";
import "@ant-design/v5-patch-for-react-19";
import styles from "@/styles/page.module.css";
import LogButton from "@/components/logButton";

export default function Game() {
  return (
    <div className={styles.centered}>
      <div style={{ background: "#A79C8B", width: "100%", height: "100%" }}>
        <LogButton />
      </div>
    </div>
  );
}
