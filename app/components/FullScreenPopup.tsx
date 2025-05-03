import React, { useEffect, useState } from "react";
import styles from "./FullScreenPopup.module.css";
import { useSelector } from "react-redux";
import { selectLogs, selectPlayers, selectTurn } from "@/lib/features/game";
import { selectPlayerName } from "@/lib/features/player";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";

const FullScreenPopup = () => {
  const [visible, setVisible] = useState(false);

  function lastProvidedClue(): string | undefined {
    const lastClue = logs?.findLast((e) => e.includes("provided the Clue"));
    const numArr = lastClue?.split(" : ")[0].split(": ");
    if (!numArr) {
      return undefined;
    }
    return numArr[numArr.length - 1];
  }

  const playerName = useSelector(selectPlayerName);
  const players = useSelector(selectPlayers);
  const turn = useSelector(selectTurn);

  function clueNotificationMustDisplay(): boolean {
    const myPlayer = players?.find((e) => e.playerName === playerName);
    if (
      myPlayer?.role == PLAYER_ROLES.RED_SPYMASTER ||
      myPlayer?.role == PLAYER_ROLES.BLUE_SPYMASTER
    ) {
      return false;
    }

    if (turn === myPlayer?.role) {
      return true;
    }

    return false;
  }

  const logs = useSelector(selectLogs);
  const triggerValue = lastProvidedClue();

  useEffect(() => {
    if (triggerValue && clueNotificationMustDisplay()) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000); // Show for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [logs]);

  return visible ? (
    <div className={styles.fullscreenOverlay}>
      <div className={styles.popupText}>{triggerValue}</div>
    </div>
  ) : null;
};

export default FullScreenPopup;
