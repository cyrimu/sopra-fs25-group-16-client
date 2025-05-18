"use client";
import "@ant-design/v5-patch-for-react-19";
import { useRouter } from "next/navigation";
import styles from "@/styles/page.module.css";
import LargeButton from "@/components/buttons/LargeButton";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.centered}>
      <div className={styles.redBlueOverlay} />
      {/* Credits to the people that built the project */}
      <div className={styles.creditWrapper}>
        <div className={styles.creditColumn}>
          <div className={styles.creditRow}>
            <span className={styles.creditNames}>
              Rashmi Dindgur (17-611-005)
            </span>
            <span className={styles.creditNames}>
              Sergi Garcia (24-753-980)
            </span>
          </div>
          <div className={styles.creditRow}>
            <span className={styles.creditNames}>
              Cyril Müller (22-700-330)
            </span>
            <span className={styles.creditNames}>
              Piotr Wojtaszewski (18-621-441)
            </span>
          </div>
          <div className={styles.creditRow}>
            <span className={styles.creditNames}>Calvin Koch (20-611-539)</span>
          </div>
        </div>
      </div>
      <div className={styles.homeContainer}>
        <LargeButton onClick={() => router.push("/create")}>Create</LargeButton>
        <LargeButton onClick={() => router.push("/join")}>Join</LargeButton>
      </div>
    </div>
  );
}
