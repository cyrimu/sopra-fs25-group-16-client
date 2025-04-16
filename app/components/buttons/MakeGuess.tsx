import { useDispatch, useSelector } from "react-redux";
import styles from "./MakeGuess.module.css";
import { selectSelectedCards } from "@/lib/features/game";

const MakeGuess: React.FC = () => {
  const dispatch = useDispatch();

  const selectedCards = useSelector(selectSelectedCards);

  function submitSelectionHandle() {
    if (!selectedCards) return;

    for (let i = 0; i < selectedCards.length; i++) {
      const card = selectedCards[i];
      dispatch({
        type: "socket/makeGuess",
        payload: card,
      });
    }
  }

  return (
    <button
      className={styles.submitSelectionButton}
      disabled={selectedCards?.length === 0}
      onClick={submitSelectionHandle}
    >
      Submit Selection
    </button>
  );
};

export default MakeGuess;
