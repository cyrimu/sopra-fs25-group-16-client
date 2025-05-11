import React, { useEffect, useState, useCallback } from "react";
import styles from "./FullScreenPopup.module.css";
import { useSelector } from "react-redux";
import { selectLastClue, selectTurn } from "@/lib/features/game";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";
import { selectMyPlayerInGame } from "../../utils/helpers";

const FullScreenPopup = () => {
  const [visible, setVisible] = useState(false);

  const turn = useSelector(selectTurn);
  const lastClue = useSelector(selectLastClue);
  const myPlayerInGame = useSelector(selectMyPlayerInGame);

  const triggerValue = lastProvidedClue();

  function lastProvidedClue(): string | undefined {
    if (!lastClue) return undefined;

    const numArr = lastClue.split(" : ")[0].split(": ");

    return numArr[numArr.length - 1];
  }

  const clueNotificationMustDisplay = useCallback((): boolean => {
    if (
        myPlayerInGame?.role === PLAYER_ROLES.RED_SPYMASTER ||
        myPlayerInGame?.role === PLAYER_ROLES.BLUE_SPYMASTER
    ) {
      return false;
    }

    return turn === myPlayerInGame?.role;


  }, [myPlayerInGame, turn]);

  useEffect(() => {
    if (triggerValue && clueNotificationMustDisplay()) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000); // Show for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [triggerValue, clueNotificationMustDisplay]);

  return visible ? (
      <div className={styles.fullscreenOverlay}>
        <div className={styles.popupText}>{triggerValue}</div>
      </div>
  ) : null;
};

export default FullScreenPopup;