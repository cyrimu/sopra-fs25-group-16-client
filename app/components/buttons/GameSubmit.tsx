import { useDispatch, useSelector } from "react-redux";
import styles from "./GameSubmit.module.css";
import { selectSelectedCards, setRevealedCard } from "@/lib/features/game";

const GameSubmit: React.FC = () => {
  const dispatch = useDispatch();

  const selectedCards = useSelector(selectSelectedCards);

  function submitSelectionHandle() {
    for (let i = 0; i < selectedCards.length; i++) {
      const card = selectedCards[i];
      dispatch(setRevealedCard(card));
    }
  }

  return (
    <button
      className={styles.submitSelectionButton}
      disabled={selectedCards.length === 0}
      onClick={submitSelectionHandle}
    >
      Submit Selection
    </button>
  );
};

export default GameSubmit;
