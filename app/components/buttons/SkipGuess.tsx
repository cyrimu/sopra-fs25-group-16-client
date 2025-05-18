import { useDispatch, useSelector } from "react-redux";
import styles from "./SkipGuess.module.css";
import { selectUsername } from "@/lib/features/player";

const SkipGuess: React.FC = () => {
  const dispatch = useDispatch();

  const username = useSelector(selectUsername);

  function submitSelectionHandle() {
    dispatch({
      type: "game/skipGuess",
      payload: username,
    });
  }

  return (
    <button className={styles.skipGuessButton} onClick={submitSelectionHandle}>
      Skip
    </button>
  );
};

export default SkipGuess;
