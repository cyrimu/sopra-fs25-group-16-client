"use client";

import ResultsTable from "@/components/resultsTable";
import styles from "@/styles/page.module.css";

function Results() {
  return (
    <div className={styles.centered}>
      <div className={styles.redBlueOverlay}></div>
      <div className={styles.messageContainer}>
        <div className={styles.lobbyTitle}>Results</div>
        <ResultsTable />
      </div>
    </div>
  );
}

export default Results;
