import { useDispatch, useSelector } from "react-redux";
import styles from "./MakeGuess.module.css";
import { selectSelectedCards } from "@/lib/features/game";
import { Guess } from "@/lib/features/game/guess.types";
import { selectUsername } from "@/lib/features/player";
import { useErrorModal } from "@/context/ErrorModalContext";

const MakeGuess: React.FC = () => {
  const dispatch = useDispatch();
  const { showError } = useErrorModal();

  const selectedCards = useSelector(selectSelectedCards);
  const username = useSelector(selectUsername);

  function submitSelectionHandle() {
    if (!selectedCards) throw new Error("No selected cards have been provided");

    if (selectedCards && selectedCards?.length < 1) {
      showError("Choose a card to reveal");
      return;
    }

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
      onClick={submitSelectionHandle}
    >
      Submit Selection
    </button>
  );
};

export default MakeGuess;
