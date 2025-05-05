import { useDispatch, useSelector } from "react-redux";
import styles from "./MakeGuess.module.css";
import { selectSelectedCards } from "@/lib/features/game";
import { Guess } from "@/lib/features/game/guess.types";
import { selectPlayerName } from "@/lib/features/player";

const MakeGuess: React.FC = () => {
  const dispatch = useDispatch();

  const selectedCards = useSelector(selectSelectedCards);
  const username = useSelector(selectPlayerName);

  function submitSelectionHandle() {
    if (!selectedCards) return;

    for (let i = 0; i < selectedCards.length; i++) {
      const card = selectedCards[i];

      const guess: Guess = {
        cardNumber: card.id,
        username: username!,
      };

      dispatch({
        type: "game/guess",
        payload: guess,
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
