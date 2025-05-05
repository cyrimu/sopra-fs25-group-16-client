import { useDispatch, useSelector } from "react-redux";
import styles from "./SkipGuess.module.css";
import { selectPlayerName } from "@/lib/features/player";

const SkipGuess: React.FC = () => {
  const dispatch = useDispatch();

  const username = useSelector(selectPlayerName);

  function submitSelectionHandle() {
    dispatch({
      type: "game/skipGuess",
      payload: username,
    });
  }

  return (
    <button className={styles.skipGuessButton} onClick={submitSelectionHandle}>
      Skip Guess
    </button>
  );
};

export default SkipGuess;
