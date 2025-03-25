"use client";
import "@ant-design/v5-patch-for-react-19";
import { useRouter } from "next/navigation";
import styles from "@/styles/page.module.css";

export default function Game() {
  const router = useRouter();

  return (
    <div className={styles.centered}>
      <div style={{ color: "white" }}>Game Page</div>
    </div>
  );
}
