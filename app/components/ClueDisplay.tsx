import { selectLastClue, selectTurn } from "@/lib/features/game";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";
import { useSelector } from "react-redux";
import styles from "./ClueDisplay.module.css";

interface DisplayedClue {
  word: string;
  number: number;
}

export const ClueDispaly = () => {
  const lastClueString = useSelector(selectLastClue);
  const turn = useSelector(selectTurn);

  function handleLastClue(): DisplayedClue | null {
    if (lastClueString) {
      const match = lastClueString.match(/provided the Clue: (.+?) ?: ?(\d+)/);
      if (match) {
        return {
          word: match[1],
          number: parseInt(match[2]),
        };
      }
    }
    return null;
  }

  const displayedClue = handleLastClue();

  if (displayedClue) {
    if (
      turn === PLAYER_ROLES.RED_OPERATIVE ||
      turn === PLAYER_ROLES.BLUE_OPERATIVE
    )
      return (
        <div className={styles.clueWrapper}>
          <div className={styles.clueContainer}>
            Clue: <strong>{displayedClue.word}</strong> {displayedClue.number}
          </div>
        </div>
      );
  }
};
